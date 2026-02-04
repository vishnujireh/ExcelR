"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postBlogComment, postBlogReply } from "@/redux/slices/blogSlice";
import type { AppDispatch, RootState } from "@/redux/store";


interface PostCommentProps {
  blogId: string | number;
  parentCommentId?: string;
  isReply?: boolean;
  onSuccess?: () => void;
}

export default function PostComment({
  blogId,
  parentCommentId,
  isReply = false,
  onSuccess,
}: PostCommentProps) {
  const dispatch = useDispatch<AppDispatch>();

  const {
    postCommentLoading,
    postCommentSuccess,
    postCommentError,
    postCommentMessage,
  } = useSelector((state: RootState) => state.blogs);

  const [formData, setFormData] = useState({
    username: "",
    useremail: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
  e.preventDefault();

  if (isReply && parentCommentId) {
    dispatch(
      postBlogReply({
        comment_id: parentCommentId,
        username: formData.username,
        useremail: formData.useremail,
        subject: formData.subject,
        message: formData.message,
      })
    );
  } else {
    dispatch(
      postBlogComment({
        blog_id: String(blogId),
        username: formData.username,
        useremail: formData.useremail,
        subject: formData.subject,
        message: formData.message,
      })
    );
  }
};


  // Reset form & close reply after success
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
    <div
      id="comment-form"
      className="mt-10 bg-white p-6 rounded-lg shadow"
    >
      <h2 className="text-xl font-semibold mb-2">
        {isReply ? "Post Reply Comments" : "Post Comments"}
      </h2>
      <div className="w-12 h-1 bg-[#197b9f] mb-4"></div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <input
            type="text"
            name="username"
            placeholder="Name *"
            value={formData.username}
            onChange={handleChange}
            className="border-b border-gray-200 text-gray-900 bg-white text-sm w-full p-3"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="useremail"
            placeholder="Email *"
            value={formData.useremail}
            onChange={handleChange}
            className="border-b border-gray-200 text-gray-900 bg-white text-sm w-full p-3"
            required
          />

          {/* Subject (only for main comment) */}
          {!isReply && (
            <div className="md:col-span-2">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="border-b border-gray-200 text-gray-900 bg-white text-sm w-full p-3"
              />
            </div>
          )}

          {/* Comment */}
          <div className="md:col-span-2">
            <textarea
              name="message"
              placeholder="Your Comments *"
              value={formData.message}
              onChange={handleChange}
              className="border-b border-gray-200 text-gray-900 bg-white text-sm w-full p-3"
              required
            />
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

      {/* Success Message */}
      {postCommentSuccess && postCommentMessage && (
        <p className="text-green-600 mt-3 text-sm">
          {postCommentMessage}
        </p>
      )}

      {/* Error Message */}
      {postCommentError && (
        <p className="text-red-600 mt-3 text-sm">
          {postCommentError}
        </p>
      )}
    </div>
  );
}
