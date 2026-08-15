import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useAdminStats } from "../../hooks/useAdminStats";
import { useAdminUsers } from "../../hooks/useAdminUsers";
import { useAdminPosts } from "../../hooks/useAdminPosts";
import { useAdminComments } from "../../hooks/useAdminComments";
import StatsCards from "../../components/admin/stats/StatsCards";
import UsersTable from "../../components/admin/user/UsersTable";
import RecentPostsTable from "../../components/admin/posts/RecentPostsTable";
import RecentCommentsList from "../../components/admin/comments/RecentCommentsList";
import CreateUserModal from "../../components/admin/user/CreateUserModal";
import EditUserModal from "../../components/admin/user/EditUserModal";
import ChangeRoleModal from "../../components/admin/role/ChangeRoleModal";
import DeleteUserModal from "../../components/admin/user/DeleteUserModal";
import DeletePostModal from "../../components/admin/posts/DeletePostModal";
import DeleteCommentModal from "../../components/admin/comments/DeleteCommentModal";
import { Link } from "react-router";

function AdminDashboard() {
  const { user } = useAuth();
  const [activeModal, setActiveModal] = useState(null);

  const stats = useAdminStats();
  const users = useAdminUsers();
  const posts = useAdminPosts(5);
  const comments = useAdminComments();

  /* 
   Cualquier mutación (usuarios, posts o comentarios) puede impactar en más de una sección (ej: borrar un usuario borra sus posts/comentarios en cascada), así que refrescamos todo para mantener los contadores consistentes en vez de intentar invalidar selectivamente cada sección.
  */

  const refreshAll = () => {
    stats.handleRetry();
    users.handleRetry();
    posts.handleRetry();
    comments.handleRetry();
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 pt-24 space-y-10">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface leading-tight">
          Panel de Administración
        </h1>
        <p className="text-sm font-medium text-outline mt-1">
          Bienvenido de nuevo. Aquí tienes un resumen del estado de tu Proyecto.
        </p>
      </header>

      <Link
        to="/admin/categorias"
        className="w-fit px-6 py-2 hidden md:block bg-primary text-on-primary font-bold rounded-full hover:shadow-lg transition-transform active:scale-95 duration-200"
      >
        Administrar categorías
      </Link>

      <StatsCards
        stats={stats.stats}
        isLoading={stats.isLoading}
        error={stats.error}
        onRetry={stats.handleRetry}
      />

      <div className="w-full flex flex-1 flex-col lg:flex-row lg:justify-between">
        <UsersTable
          users={users.users}
          isLoading={users.isLoading}
          error={users.error}
          onRetry={users.handleRetry}
          currentUserId={user?.id}
          onCreate={() => setActiveModal({ type: "createUser" })}
          onEdit={(u) => setActiveModal({ type: "editUser", user: u })}
          onChangeRole={(u) => setActiveModal({ type: "changeRole", user: u })}
          onDelete={(u) => setActiveModal({ type: "deleteUser", user: u })}
        />

        <RecentCommentsList
          comments={comments.comments}
          isLoading={comments.isLoading}
          error={comments.error}
          onRetry={comments.handleRetry}
          onDelete={(comment) =>
            setActiveModal({ type: "deleteComment", comment })
          }
        />
      </div>

      <RecentPostsTable
        posts={posts.posts}
        isLoading={posts.isLoading}
        error={posts.error}
        onRetry={posts.handleRetry}
        onDelete={(post) => setActiveModal({ type: "deletePost", post })}
      />

      {activeModal?.type === "createUser" && (
        <CreateUserModal
          onClose={() => setActiveModal(null)}
          onSuccess={refreshAll}
        />
      )}

      {activeModal?.type === "editUser" && (
        <EditUserModal
          user={activeModal.user}
          onClose={() => setActiveModal(null)}
          onSuccess={refreshAll}
        />
      )}

      {activeModal?.type === "changeRole" && (
        <ChangeRoleModal
          user={activeModal.user}
          onClose={() => setActiveModal(null)}
          onSuccess={refreshAll}
        />
      )}

      {activeModal?.type === "deleteUser" && (
        <DeleteUserModal
          user={activeModal.user}
          onClose={() => setActiveModal(null)}
          onSuccess={refreshAll}
        />
      )}

      {activeModal?.type === "deletePost" && (
        <DeletePostModal
          post={activeModal.post}
          onClose={() => setActiveModal(null)}
          onSuccess={refreshAll}
        />
      )}

      {activeModal?.type === "deleteComment" && (
        <DeleteCommentModal
          comment={activeModal.comment}
          onClose={() => setActiveModal(null)}
          onSuccess={refreshAll}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
