import React, { useCallback,useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {

//   console.log("Here is my post",post);
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [loading, setLoading]=useState(false)
    // console.log("userData:=", userData);

    const submit = async (data) => {
        setLoading(true)
        if (post) { // update post
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
            // if upload done
            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,   // file.$id is unique image id
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {  // new post
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
        setLoading(false)
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap pt-14">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ?
                        loading ? (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 50 50"
                        style={{textAlign:"center", fontSize:"15px", marginLeft:"46%", width:"30px"}}
                        >
                        <circle
                            cx="25"
                            cy="25"
                            r="20"
                            fill="none"
                            stroke-width="5"
                            stroke="#ccc"
                            stroke-dasharray="31.41592653589793 31.41592653589793"
                        >
                            <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="rotate"
                            from="0 25 25"
                            to="360 25 25"
                            dur="1s"
                            repeatCount="indefinite"
                            />
                        </circle>
                        </svg>

                    ) : "Update"

                     : 
                     loading ? (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 50 50"
                        style={{textAlign:"center", fontSize:"15px", marginLeft:"46%", width:"30px"}}
                        >
                        <circle
                            cx="25"
                            cy="25"
                            r="20"
                            fill="none"
                            stroke-width="5"
                            stroke="#ccc"
                            stroke-dasharray="31.41592653589793 31.41592653589793"
                        >
                            <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="rotate"
                            from="0 25 25"
                            to="360 25 25"
                            dur="1s"
                            repeatCount="indefinite"
                            />
                        </circle>
                        </svg>

                    ) : "Submit" 
                     }
                </Button>
            </div>
        </form>
    );
}