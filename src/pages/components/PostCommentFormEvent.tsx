"use client";

import React, { useEffect, useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postEventComment, postEventReply } from "@/redux/slices/newsEventsSlice";
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

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

  // ✅ Reset form after success
  useEffect(() => {
    if (postCommentSuccess) {
      setFormData({
        username: "",
        useremail: "",
        subject: "",
        message: "",
      });
      onSuccess?.();
    }
  }, [postCommentSuccess, onSuccess]);

  return (
    <div className="mt-10 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">
        {isReply ? "Post Reply Comments" : "Post Comments"}
      </h2>
      <div className="w-12 h-1 bg-[#197b9f] mb-4" />

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="username"
            placeholder="Name *"
            value={formData.username}
            onChange={handleChange}
            required
            className="border-b border-gray-200 p-3 text-sm"
          />

          <input
            type="email"
            name="useremail"
            placeholder="Email *"
            value={formData.useremail}
            onChange={handleChange}
            required
            className="border-b border-gray-200 p-3 text-sm"
          />

          {!isReply && (
            <div className="md:col-span-2">
              <input
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="border-b border-gray-200 p-3 text-sm w-full"
              />
            </div>
          )}

          <div className="md:col-span-2">
            <textarea
              name="message"
              placeholder="Your Comments *"
              value={formData.message}
              onChange={handleChange}
              required
              className="border-b border-gray-200 p-3 text-sm w-full"
            />
          </div>

          <div className="md:col-span-2 mt-3">
            <button
              type="submit"
              disabled={postCommentLoading}
              className="bg-[#0071BC] text-white px-5 py-2.5 rounded-lg disabled:opacity-50"
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
        <p className="text-green-600 mt-3 text-sm">{postCommentMessage}</p>
      )}

      {postCommentError && (
        <p className="text-red-600 mt-3 text-sm">{postCommentError}</p>
      )}
    </div>
  );
}
