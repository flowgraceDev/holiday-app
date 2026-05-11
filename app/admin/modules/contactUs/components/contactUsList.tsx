import { getContactAction } from "./../actions";
import CreateContactModal from "./create-contact-modal";
import EditContactModal from "./edit-contact-modal";
import DeleteContactButton from "./delete-tour-button";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function ContactList() {
  const res = await getContactAction();

  const isEmpty = !res;
  const hasOne = !!res;

  return (
    <div className="p-10 space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-800">
          Contact Section
        </h1>

        {/* CREATE ONLY WHEN EMPTY */}
        {isEmpty && <CreateContactModal />}
      </div>

      {isEmpty ? (
        <div className="border border-dashed border-neutral-300 rounded-3xl p-16 text-center bg-white">
          <p className="text-neutral-500 text-sm mb-4">No contact data found</p>
          <p className="text-neutral-400 text-xs">
            Create your first contact section to get started
          </p>
        </div>
      ) : (
        <div className="space-y-6 border border-neutral-200 rounded-3xl p-6 bg-white shadow-sm group">
          {/* ACTIONS ONLY WHEN DATA EXISTS */}
          <div className="flex justify-end gap-3">
            <EditContactModal />
            <DeleteContactButton id={res.id} />
          </div>

          {/* HERO */}
          {/* HERO IMAGES */}
          <div className="flex items-center gap-6">
            <div className="flex gap-3 overflow-x-auto">
              {Array.isArray(res.image_url) && res.image_url.length ? (
                res.image_url.map((img: any, idx: any) => (
                  <div
                    key={idx}
                    className="relative h-28 w-44 shrink-0 overflow-hidden rounded-2xl border"
                  >
                    <Image
                      src={img}
                      alt={`contact-${idx}`}
                      width={176}
                      height={112}
                      className="object-cover"
                    />
                  </div>
                ))
              ) : (
                <div className="relative h-28 w-44 overflow-hidden rounded-2xl border">
                  <Image
                    src="/placeholder.jpg"
                    alt="contact"
                    width={176}
                    height={112}
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* HIGHLIGHT */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Highlight</h2>
            <p className="text-sm text-neutral-600">{res.highlight}</p>
          </div>

          {/* SECTION */}
          <div className="rounded-2xl border bg-white p-6">
            <h2 className="text-lg font-semibold mb-2">{res.section_title}</h2>
            <p className="text-sm text-neutral-500 mb-2">
              {res.section_highlight}
            </p>
            <p className="text-sm text-neutral-600">
              {res.section_description}
            </p>
          </div>

          {/* MAP */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Map</h2>
            <div className="w-full h-[300px] rounded-xl overflow-hidden border">
              <iframe
                src={res.map_url}
                className="w-full h-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
