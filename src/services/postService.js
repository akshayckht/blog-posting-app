

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { auth, db } from "../lib/firebase.js";

// Collection reference
const postsCollectionRef = collection(db, "posts");

// Ensure the user is authenticated.
const requireAuthenticatedUser = () => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("You must be logged in to perform this action.");
  }

  return user;
};

// Validate and normalize incoming post data.
const normalizePostData = (postData = {}) => {
  const { title, content } = postData;

  if (typeof title !== "string" || typeof content !== "string") {
    throw new Error("Title and content must be text.");
  }

  const normalizedTitle = title.trim();
  const normalizedContent = content.trim();

  if (!normalizedTitle) {
    throw new Error("Post title is required.");
  }

  if (normalizedTitle.length > 120) {
    throw new Error("Title cannot exceed 120 characters.");
  }

  if (!normalizedContent) {
    throw new Error("Post content is required.");
  }

  if (normalizedContent.length > 10000) {
    throw new Error("Content cannot exceed 10000 characters.");
  }

  return {
    title: normalizedTitle,
    content: normalizedContent,
  };
};

// CREATE: Add a new post.
export const createPost = async (postData) => {
  const user = requireAuthenticatedUser();

  const normalizedData = normalizePostData(postData);

  const newPost = {
    ...normalizedData,
    authorId: user.uid,
    authorName: user.displayName,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  if (user.displayName?.trim()) {
    newPost.authorName = user.displayName.trim();
  }

  const docRef = await addDoc(postsCollectionRef, newPost);

  return docRef.id;
};

// READ: Get all posts, newest first.
export const getAllPosts = async () => {
  requireAuthenticatedUser();

  const postsQuery = query(
    postsCollectionRef,
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(postsQuery);

  return querySnapshot.docs.map((postDoc) => ({
    id: postDoc.id,
    ...postDoc.data(),
  }));
};

// READ: Get posts belonging to the current user.
export const getMyPosts = async () => {
  const user = requireAuthenticatedUser();

  const postsQuery = query(
    postsCollectionRef,
    where("authorId", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(postsQuery);

  return querySnapshot.docs.map((postDoc) => ({
    id: postDoc.id,
    ...postDoc.data(),
  }));
};

// READ: Get a single post by document ID.
export const getPostById = async (postId) => {
  requireAuthenticatedUser();

  if (typeof postId !== "string" || !postId.trim()) {
    throw new Error("A valid post ID is required.");
  }

  const postRef = doc(db, "posts", postId);

  const postSnapshot = await getDoc(postRef);

  if (!postSnapshot.exists()) {
    return null;
  }

  return {
    id: postSnapshot.id,
    ...postSnapshot.data(),
  };
};

// UPDATE: Update an existing post.
export const updatePost = async (postId, postData) => {
  requireAuthenticatedUser();

  if (typeof postId !== "string" || !postId.trim()) {
    throw new Error("A valid post ID is required.");
  }

  const normalizedData = normalizePostData(postData);

  const postRef = doc(db, "posts", postId);

  await updateDoc(postRef, {
    ...normalizedData,
    updatedAt: serverTimestamp(),
  });
};

// DELETE: Delete an existing post.
export const deletePost = async (postId) => {
  requireAuthenticatedUser();

  if (typeof postId !== "string" || !postId.trim()) {
    throw new Error("A valid post ID is required.");
  }

  const postRef = doc(db, "posts", postId);

  await deleteDoc(postRef);
};

