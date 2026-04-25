// app/admin/modules/contactUs/components/contact-list.tsx
import { getContactAction } from "./../actions";
import CreateContactModal from "./create-contact-modal";
import Image from "next/image";
export const dynamic = "force-dynamic";

export default async function ContactList() {
const res = await getContactAction();
console.log(res)
if (!res) {
  return (
    <div className="p-10 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-800">
          Contact Section
        </h1>
        <CreateContactModal />
      </div>

      <div className="border border-dashed border-neutral-300 rounded-3xl p-16 text-center bg-white">
        <p className="text-neutral-500 text-sm mb-4">
          No contact data found
        </p>
        <p className="text-neutral-400 text-xs">
          Create your first contact section to get started
        </p>
      </div>
    </div>
  );
}

const contactList = res;
console.log(contactList)
  return (
    <div className="p-10 space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-800">
          Contact Section
        </h1>
      </div>

      {contactList && (
        <div className="grid gap-8">
          <div className="space-y-6 border border-neutral-200 rounded-3xl p-6 bg-white shadow-sm">
            {/* <div className="flex justify-end">
              <DeleteContactButton id={contactList.id} />
            </div> */}

            {/* HERO */}
            <div className="flex items-center gap-6">
              <div className="relative h-28 w-44 overflow-hidden rounded-2xl border shrink-0">
                <Image
                  src={contactList?.image_url || "/placeholder.jpg"}
                  alt="contact"
                  width={176}
                  height={112}
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-1">
                <p className="text-lg font-semibold text-neutral-900">
                  {contactList.title}
                </p>
                <p className="text-sm text-neutral-500">
                  {contactList.subtitle}
                </p>
                <p className="text-sm text-neutral-600 line-clamp-2">
                  {contactList.description}
                </p>
              </div>
            </div>

            {/* HIGHLIGHT */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Highlight</h2>
              <p className="text-sm text-neutral-600">
                {contactList.highlight}
              </p>
            </div>

            {/* SECTION */}
            <div className="rounded-2xl border bg-white p-6">
              <h2 className="text-lg font-semibold mb-2">
                {contactList.section_title}
              </h2>
              <p className="text-sm text-neutral-500 mb-2">
                {contactList.section_highlight}
              </p>
              <p className="text-sm text-neutral-600">
                {contactList.section_description}
              </p>
            </div>

            {/* MAP */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Map</h2>
              <div className="w-full h-[300px] rounded-xl overflow-hidden border">
                <iframe
                  src={contactList.map_url}
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}