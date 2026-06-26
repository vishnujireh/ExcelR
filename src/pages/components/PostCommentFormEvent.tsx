"use client";

import React, { useState, FormEvent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postEventComment, postEventReply, resetCommentStatus } from "@/redux/slices/newsEventsSlice";
import type { AppDispatch, RootState } from "@/redux/store";

interface EventPostCommentFormProps {
  eventId: string;
  parentCommentId?: string;
  isReply?: boolean;
  onSuccess?: () => void;
}

export default function EventPostCommentForm({
  eventId,
  parentCommentId,
  isReply = false,
  onSuccess,
}: EventPostCommentFormProps) {
  const dispatch = useDispatch<AppDispatch>();

  const {
    postCommentLoading,
    postCommentSuccess,
    postCommentError,
    postCommentMessage,
  } = useSelector((state: RootState) => state.newsEvents);

  const [formData, setFormData] = useState({
    username: "",
    useremail: "",
    subject: "",
    message: "",
  });
  const [localErrors, setLocalErrors] = useState<{
    username?: string;
    useremail?: string;
    subject?: string;
    message?: string;
  }>({});
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const errors: { username?: string; useremail?: string; subject?: string; message?: string } = {};
    if (!formData.username.trim()) errors.username = "Name is required.";
    if (!formData.useremail.trim()) errors.useremail = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.useremail.trim()))
      errors.useremail = "Enter a valid email.";
    if (!formData.subject.trim()) errors.subject = "Subject is required.";
    if (!formData.message.trim()) errors.message = "Message is required.";

    setLocalErrors(errors);
    if (Object.keys(errors).length) return;

    if (isReply && parentCommentId) {
      dispatch(
        postEventReply({
          comment_id: parentCommentId,
          username: formData.username,
          useremail: formData.useremail,
          subject: formData.subject,
          message: formData.message,
        })
      );
    } else {
      dispatch(
        postEventComment({
          news_events_id: eventId,
          username: formData.username,
          useremail: formData.useremail,
          subject: formData.subject,
          message: formData.message,
        })
      );
    }
  };

  useEffect(() => {
    if (postCommentSuccess) {
      setFormData({ username: "", useremail: "", subject: "", message: "" });
      setLocalErrors({});

      const timer = setTimeout(() => {
        onSuccess?.();
        dispatch(resetCommentStatus());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [postCommentSuccess, onSuccess, dispatch]);

  // Autofocus reply textarea when reply mode is active
  useEffect(() => {
    if (isReply) {
      setTimeout(() => {
        messageRef.current?.focus();
      }, 50);
    }
  }, [isReply]);

  return (
    <div id="comment-form" className="mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">
        {isReply ? "Post Reply Comments" : "Post Comments"}
      </h2>
      <div className="w-12 h-1 bg-[#197b9f] mb-4"></div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Name */}
          <div>
            <input
              type="text"
              name="username"
              placeholder="Name *"
              value={formData.username}
              onChange={handleChange}
              className="border-b border-gray-200 text-gray-900 bg-white text-sm w-full p-3"
            />
            {localErrors.username && (
              <p className="mt-1 text-xs text-red-600">{localErrors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="useremail"
              placeholder="Email *"
              value={formData.useremail}
              onChange={handleChange}
              className="border-b border-gray-200 text-gray-900 bg-white text-sm w-full p-3"
            />
            {localErrors.useremail && (
              <p className="mt-1 text-xs text-red-600">{localErrors.useremail}</p>
            )}
          </div>

          {/* Subject — shown for both main comment and reply */}
          <div className="md:col-span-2">
            <input
              type="text"
              name="subject"
              placeholder="Subject *"
              value={formData.subject}
              onChange={handleChange}
              className="border-b border-gray-200 text-gray-900 bg-white text-sm w-full p-3"
            />
            {localErrors.subject && (
              <p className="mt-1 text-xs text-red-600">{localErrors.subject}</p>
            )}
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <textarea
              name="message"
              placeholder="Your Comments *"
              value={formData.message}
              onChange={handleChange}
              ref={messageRef}
              className="border-b border-gray-200 text-gray-900 bg-white text-sm w-full p-3"
            />
            {localErrors.message && (
              <p className="mt-1 text-xs text-red-600">{localErrors.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="md:col-span-2 mt-3">
            <button
              type="submit"
              disabled={postCommentLoading}
              className="border cursor-pointer border-[#0071BC] bg-[#0071BC] hover:bg-[#4ba7de] text-white font-medium text-sm py-2.5 px-5 rounded-lg disabled:opacity-50"
            >
              {postCommentLoading
                ? "Posting..."
                : isReply
                ? "Post Reply"
                : "Post Comment"}
            </button>
          </div>

        </div>
      </form>

      {postCommentSuccess && postCommentMessage && (
        <p className="text-green-600 mt-3 text-sm font-medium">{postCommentMessage}</p>
      )}
      {postCommentError && (
        <p className="text-red-600 mt-3 text-xs font-medium">{postCommentError}</p>
      )}
    </div>
  );
}
