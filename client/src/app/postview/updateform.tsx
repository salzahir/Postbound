import { Comment } from "@/types/comments";
import React, { useState } from "react";
import { getApiUrl } from '../utils/api';

function UpdateComment({comment, token}: {comment: Comment, token: string}) {

    const [title, setTitle] = useState(comment.title);
    const [content, setContent] = useState(comment.content);
    

    async function updateComment() {
        try {
            const json = { title, content };
            const res = await fetch(getApiUrl(`/comments/${comment.id}`), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `