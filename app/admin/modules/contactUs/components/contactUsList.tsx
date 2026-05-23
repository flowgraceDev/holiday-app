import { getContactAction } from "./../actions";
import CreateContactModal from "./create-contact-modal";
import EditContactModal from "./edit-contact-modal";
import DeleteContactButton from "./delete-tour-button";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function ContactList() {
  const res = await getContactAction();

  const isEmpty = !res;

  return (
    <div className="min-h-screen bg-[#0B1020] text-white p-10 space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white/90">
          Contact Section
        </h1>

        {isEmpty && <CreateContactModal />}
      </div>

      {isEmpty ? (
        <div className="border border-white/10 rounded-3xl p-16 text-center bg-white/5 backdrop-blur-xl">
          <p className="text-white/60 text-sm mb-4">
            No contact data found
          </p>
          <p className="text-white/40 text-xs">
            Create your first contact section to get started
          </p>
        </div>
      ) : (
        <div className="space-y-6 border border-white/10 rounded-3xl p-6 bg-white/5 backdrop-blur-2xl shadow-2xl group">
          <div className="flex justify-end gap-3">
            <EditContactModal />
            <DeleteContactButton id={res.id} />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex gap-3 overflow-x-auto">
              {Array.isArray(res.image_url) && res.image_url.length ? (
                res.image_url.map((img: any, idx: any) => (
                  <div
                    key={idx}
                    className="relative h-28 w-44 shrink-0 overflow-hidden rounded-2xl border border-white/10"
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
                <div className="relative h-28 w-44 overflow-hidden rounded-2xl border border-white/10">
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

          <div>
            <h2 className="text-lg font-semibold mb-2 text-white/90">
              Highlight
            </h2>
            <p className="text-sm text-white/60">{res.highlight}</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
            <h2 className="text-lg font-semibold mb-2 text-white/90">
              {res.section_title}
            </h2>
            <p className="text-sm text-white/50 mb-2">
              {res.section_highlight}
            </p>
            <p className="text-sm text-white/60">
              {res.section_description}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2 text-white/90">
              Map
            </h2>

            <div className="w-full h-[300px] rounded-xl overflow-hidden border border-white/10">
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