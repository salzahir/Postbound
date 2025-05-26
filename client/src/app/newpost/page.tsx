'use client';

import { useState } from "react";
import { FormEvent } from "react";
import Header from "../header";
import PostForm from "./postform";
import { getApiUrl } from '../utils/api';

function NewPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSubmitPost(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            setError("");
            setSuccess("");
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No token found");
                return;
            }
            const json = { title, content, isPublic };
            const res = await fetch(getApiUrl("/posts"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `