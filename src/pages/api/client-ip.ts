import type { NextApiRequest, NextApiResponse } from "next";

const normalizeIp = (raw?: string) => {
  const value = (raw || "").trim();
  if (!value) return "";

  const bracketMatch = value.match(/^\[([^\]]+)\](?::\d+)?$/);
  if (bracketMatch?.[1]) return bracketMatch[1];

  if (value.includes(".") && value.includes(":")) {
    const idx = value.lastIndexOf(":");
    const maybeIp = value.slice(0, idx);
    const maybePort = value.slice(idx + 1);
    if (/^\d+$/.test(maybePort)) {
      return maybeIp;
    }
  }

  if (value.toLowerCase().startsWith("::ffff:")) {
    return value.slice(7);
  }

  return value;
};

const isPrivateOrLocalIp = (ip: string) => {
  const v = (ip || "").toLowerCase();
  if (!v) return true;

  if (v === "::1" || v === "::" || v === "0.0.0.0") return true;
  if (v.startsWith("127.") || v.startsWith("10.") || v.startsWith("192.168.")) {
    return true;
  }
  if (v.startsWith("172.")) {
    const second = Number(v.split(".")[1] || "-1");
    if (second >= 16 && second <= 31) return true;
  }
  if (v.startsWith("fc") || v.startsWith("fd") || v.startsWith("fe80")) {
    return true;
  }

  return false;
};

const readHeaderValue = (header: string | string[] | undefined) => {
  if (typeof header === "string") return header;
  if (Array.isArray(header)) return header[0] || "";
  return "";
};

const pickPublicIpFromCsv = (raw: string) => {
  const list = raw
    .split(",")
    .map((part) => normalizeIp(part))
    .filter(Boolean);

  for (const item of list) {
    if (!isPrivateOrLocalIp(item)) return item;
  }

  return "";
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const cfConnectingIp = normalizeIp(readHeaderValue(req.headers["cf-connecting-ip"]));
  const trueClientIp = normalizeIp(readHeaderValue(req.headers["true-client-ip"]));
  const xClientIp = normalizeIp(readHeaderValue(req.headers["x-client-ip"]));
  const xForwardedFor = pickPublicIpFromCsv(
    readHeaderValue(req.headers["x-forwarded-for"])
  );
  const xRealIp = normalizeIp(readHeaderValue(req.headers["x-real-ip"]));
  const remoteIp = normalizeIp(req.socket?.remoteAddress || "");

  const candidates = [
    cfConnectingIp,
    trueClientIp,
    xClientIp,
    xForwardedFor,
    xRealIp,
    remoteIp,
  ].filter(Boolean);

  const ip = candidates.find((candidate) => !isPrivateOrLocalIp(candidate)) || "";
  res.setHeader("Cache-Control", "no-store, max-age=0");
  return res.status(200).json({ ip });
}
