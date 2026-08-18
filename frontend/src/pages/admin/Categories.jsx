import { useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import { CategoriesTable } from "../../components/admin/categories/CategoriesTable";
import { CreateCategoryModal } from "../../components/admin/categories/CreateCategoryModal";
import { EditCategoryModal } from "../../components/admin/categories/EditCategoryModal";
import { DeleteCategoryModal } from "../../components/admin/categories/DeleteCategoryModal";
import ErrorMessage from "../../components/common/ErrorMessage";
import WarningIcon from "~icons/material-symbols/warning-outline";

function Categories() {
  const { categories, isLoading, error, handleRetry } = useCategories();
  const [activeModal, setActiveModal] = useState(null);

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto p-6 pt-24">
        <ErrorMessage
          icon={WarningIcon}
          message={error}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto pt-24">
      <CategoriesTable
        data={categories}
        isLoading={isLoading}
        onCreate={() => setActiveModal({ type: "create" })}
        onEdit={(category) => setActiveModal({ type: "edit", category })}
        onDelete={(category) => setActiveModal({ type: "delete", category })}
      />

      {activeModal?.type === "create" && (
        <CreateCategoryModal
          onClose={() => setActiveModal(null)}
          onSuccess={handleRetry}
        />
      )}

      {activeModal?.type === "edit" && (
        <EditCategoryModal
          category={activeModal.category}
          onClose={() => setActiveModal(null)}
          onSuccess={handleRetry}
        />
      )}

      {activeModal?.type === "delete" && (
        <DeleteCategoryModal
          category={activeModal.category}
          onClose={() => setActiveModal(null)}
          onSuccess={handleRetry}
        />
      )}
    </div>
  );
}

export default Categories;
