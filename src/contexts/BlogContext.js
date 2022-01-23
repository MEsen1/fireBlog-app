import {
  set,
  ref,
  push,
  remove,
  child,
  update,
  onValue,
} from "firebase/database";
import React, { useContext, createContext, useState, useEffect } from "react";
import { firebaseDB } from "../helpers/firebase";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/toastNotify";

// Creating context for global data
const BlogContext = createContext();

// Defining a method for getting context
// it returns state and dispatch
export function useBlog() {
  return useContext(BlogContext);
}

// Defining a method for BlogContext.Provider
export function BlogContextProvider({ children }) {
  const [currentBlogs, setCurrentBlogs] = useState();

  function addBlog(blogValue) {
    const postListRef = ref(firebaseDB, "blog");
    const newPostRef = push(postListRef);

    set(newPostRef, {
      author: blogValue.author,
      title: blogValue.title,
      content: blogValue.content,
      get_like_count: blogValue.get_like_count,
      get_share_count: blogValue.get_share_count,
      image: blogValue.image,
    });

    toastSuccessNotify("data added");
  }

  function getOneBlog(id) {
    const result = currentBlogs?.filter((item) => item.id === id);
    return result;
  }

  function deleteOneBlog(id) {
    remove(ref(firebaseDB, "blog/" + id));
  }

  function updateBlog(id, data) {
    //const newUserKey = push(child(ref(firebaseDB), "blog/")).key;
    const updates = {};
    updates["blog/" + id] = data;
    return update(ref(firebaseDB), updates);
  }

  useEffect(() => {
    const blogRef = ref(firebaseDB, "blog");
    onValue(blogRef, (snapshot) => {
      const data = snapshot.val();
      const blogList = [];
      for (let id in data) {
        blogList.push({ id, ...data[id] });
      }
      setCurrentBlogs(blogList);
    });
  }, []);

  const value = {
    addBlog,
    currentBlogs,
    getOneBlog,
    deleteOneBlog,
    updateBlog,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}
