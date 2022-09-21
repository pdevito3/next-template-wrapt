import { createStyles } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import React from "react";

interface DeleteModalProps {
  title?: string;
  onCancel?(): void;
  onConfirm?(): void;
  children?: React.ReactNode;
}

function useDeleteModal() {
  const useStyles = createStyles({});
  const { cx } = useStyles();

  const openDeleteModal = ({
    onConfirm,
    onCancel,
    title,
    children,
  }: DeleteModalProps) =>
    openConfirmModal({
      title: title ?? "Please Confirm",
      centered: true,
      children: children ?? (
        <p className="text-sm text-slate-900 dark:text-white">
          Are you sure you want to delete this record?
        </p>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: {
        classNames: {
          root: cx("bg-red-400 hover:bg-red-500"),
        },
      },
      //TODO make secondary button style??
      cancelProps: {
        classNames: {
          root: cx(
            "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
          ),
        },
      },
      classNames: {
        modal: cx("bg-white dark:bg-slate-700"),
        title: cx("text-slate-900 dark:text-white text-lg font-medium"),
        close: cx(
          "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
        ),
      },
      onCancel,
      onConfirm,
    });
  return openDeleteModal;
}

export default useDeleteModal;
