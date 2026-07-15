import { useState } from "react";
import { useNavigate } from "react-router";
import { create } from "../../services/post.service";
import Alert from "../../components/ui/Alert";
import PostForm from "../../components/posts/PostForm";

function CreatePost() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

  const onSubmit = async (formData) => {
    setServerError(null);
    try {
      const post = await create(formData);
      navigate(`/posts/${post.id}`);
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-6">
      <main className="pt-12 pb-32 px-6 max-w-200 mx-auto">
        {serverError && (
          <div className="mb-8">
            <Alert type="error" message={serverError} />
          </div>
        )}
        <PostForm onSubmit={onSubmit} />
      </main>
    </div>
  );
}

export default CreatePost;
