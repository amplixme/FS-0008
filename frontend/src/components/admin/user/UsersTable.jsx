import EmptyState from "../../common/EmptyState";
import Spinner from "../../common/Spinner";
import ErrorMessage from "../../common/ErrorMessage";
import WarningIcon from "~icons/material-symbols/warning-outline";
import ProgressActivityIcon from "~icons/material-symbols/progress-activity";
import GroupOffIcon from "~icons/material-symbols/group-off";
import EditIcon from "~icons/material-symbols/edit-outline";
import DeleteIcon from "~icons/material-symbols/delete-outline";
import { formatDate } from "../../../utils/formatDate";

function RoleBadge({ role }) {
  const isAdmin = role === "ADMIN";
  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full ${
        isAdmin
          ? "bg-primary-fixed text-on-primary-fixed"
          : "bg-surface-variant text-on-surface-variant"
      }`}
    >
      {role}
    </span>
  );
}

function UsersTable({
  users = [],
  isLoading = false,
  error,
  onRetry,
  currentUserId,
  onCreate,
  onEdit,
  onChangeRole,
  onDelete,
}) {
  return (
    <div className="w-auto lg:w-3/4 bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
      {/* Header del bloque */}
      <div className="flex flex-col lg:flex-row items-start lg:justify-between p-6 border-b border-slate-100 gap-2">
        <div className="flex flex-row items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900">Usuarios</h1>
          <span className="bg-blue-100 text-blue-700 py-0.5 px-3 rounded-full text-sm font-semibold">
            {isLoading ? "..." : users.length}
          </span>
        </div>
        <button
          type="button"
          onClick={onCreate}
          disabled={isLoading}
          className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          + Crear usuario
        </button>
      </div>

      {error ? (
        <div className="p-6">
          <ErrorMessage icon={WarningIcon} message={error} onRetry={onRetry} />
        </div>
      ) : isLoading ? (
        <Spinner icon={ProgressActivityIcon} message="Cargando usuarios..." />
      ) : users.length === 0 ? (
        <EmptyState
          icon={GroupOffIcon}
          message="No hay usuarios registrados."
        />
      ) : (
        <>
          {/* Tabla: desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container border-b border-surface-variant/30 text-xs font-bold text-outline uppercase">
                  <th className="py-4 px-6">Nombre</th>
                  <th className="py-4 px-6">Email</th>
                  <th className="py-4 px-6">Rol</th>
                  <th className="py-4 px-6">Fecha de registro</th>
                  <th className="py-4 px-6 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-variant/30">
                {users.map((user) => {
                  const isSelf = user.id === currentUserId;
                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-surface-container transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold text-on-surface">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-on-surface-variant">
                        {user.email}
                      </td>
                      <td className="py-4 px-6">
                        <RoleBadge role={user.role} />
                      </td>
                      <td className="py-4 px-6 text-sm text-on-surface-variant">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="py-4 px-6">
                        {/* Acciones */}
                        <div className="flex flex-col items-end gap-2">
                          <button
                            type="button"
                            onClick={() => onChangeRole(user)}
                            disabled={isSelf}
                            title={
                              isSelf
                                ? "No podés cambiar tu propio rol"
                                : "Cambiar rol"
                            }
                            className="px-4 py-1.5 border border-surface-variant rounded-full text-sm font-medium text-primary hover:border-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            Cambiar rol
                          </button>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => onEdit(user)}
                              title="Editar usuario"
                              className="p-2 rounded-full hover:bg-blue-100 text-on-surface-variant hover:border-outline transition-colors"
                            >
                              <EditIcon
                                className="text-lg"
                                aria-hidden="true"
                              />
                            </button>

                            <button
                              type="button"
                              onClick={() => onDelete(user)}
                              disabled={isSelf}
                              title={
                                isSelf
                                  ? "No podés eliminarte a vos mismo"
                                  : "Eliminar usuario"
                              }
                              className="p-2 text-error hover:bg-error-container/40 rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              <DeleteIcon
                                className="text-lg"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Tarjetas: mobile */}
          <div className="md:hidden divide-y divide-surface-variant/30">
            {users.map((user) => {
              const isSelf = user.id === currentUserId;
              return (
                <div key={user.id} className="p-5 space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-col min-w-0">
                      <p className="font-semibold text-on-surface truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-outline truncate">
                        {user.email}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onEdit(user)}
                      title="Editar usuario"
                      className="p-2 rounded-full hover:bg-blue-100 text-on-surface-variant hover:border-outline transition-colors"
                    >
                      <EditIcon className="text-lg" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-outline uppercase tracking-wider">
                      Rol
                    </span>
                    <RoleBadge role={user.role} />
                  </div>

                  <div className="flex border-t border-surface-variant/30 -mx-5 -mb-5 mt-3">
                    <button
                      type="button"
                      onClick={() => onChangeRole(user)}
                      disabled={isSelf}
                      className="flex-1 py-3 text-sm font-bold text-primary hover:bg-surface-container transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Cambiar Rol
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(user)}
                      disabled={isSelf}
                      className="flex-1 py-3 text-sm font-bold text-error hover:bg-error-container/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default UsersTable;
