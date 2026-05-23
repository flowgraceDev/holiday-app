// app/admin/module/services/ui/client-wrapper.tsx
"use client";

import { useEffect, useState, useCallback } from "react";

import ServicesList from "../components/ServicesList";
import CreateServiceModal from "../components/CreateServiceModal";
import DeleteModal from "../components/DeleteModal";
import EditServiceModal from "../components/EditServiceModal";
import { getServices } from "../actions";

export default function ClientWrapper({
  initialData,
  service,
}: {
  initialData: any[];
  service?: string;
}) {
  const [data, setData] = useState(initialData);

  const [createOpen, setCreateOpen] = useState(false);

  const [deleteState, setDeleteState] = useState<{
    open: boolean;
    id: string | null;
  }>({ open: false, id: null });

  const [editState, setEditState] = useState<{
    open: boolean;
    data: any | null;
  }>({ open: false, data: null });

  const refresh = useCallback(async () => {
    const res = await getServices(service ?? "");
    setData(res || []);
  }, [service]);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setCreateOpen(true)}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Add Service
        </button>
      </div>

      <ServicesList
        data={data}
        onDelete={(id) => setDeleteState({ open: true, id })}
        onEdit={(item) => setEditState({ open: true, data: item })}
      />

      <CreateServiceModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSuccess={refresh}
      />

      <EditServiceModal
        open={editState.open}
        data={editState.data}
        onClose={() => setEditState({ open: false, data: null })}
        onSuccess={refresh}
      />

      <DeleteModal
        open={deleteState.open}
        id={deleteState.id}
        onClose={() => setDeleteState({ open: false, id: null })}
        onSuccess={refresh}
      />
    </div>
  );
}