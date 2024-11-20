import React from "react";

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Confirm Deletion
          </h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteDialog;
