"use client";

import { useMemo, useState, useTransition, useEffect } from "react";
import { createContact } from "@/app/actions/contact";
import StatusModal from "@/app/components/StatusModal";

type Errors = {
  full_name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [isPending, startTransition] = useTransition();

  const initialState = {
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };

  const [formValues, setFormValues] = useState(initialState);

  function validate(values: typeof formValues) {
    const e: Errors = {};

    if (!values.full_name || values.full_name.trim().length < 2) {
      e.full_name = "Minimum 2 characters required";
    }

    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      e.email = "Invalid email";
    }

    if (values.phone && !/^[0-9]{7,15}$/.test(values.phone)) {
      e.phone = "Invalid phone";
    }

    if (values.subject && values.subject.length > 150) {
      e.subject = "Too long";
    }

    if (!values.message || values.message.trim().length < 5) {
      e.message = "Minimum 5 characters required";
    }

    return e;
  }

  const currentErrors = useMemo(() => validate(formValues), [formValues]);
  const isFormValid = Object.keys(currentErrors).length === 0;

  function resetForm() {
    setFormValues(initialState);
    setErrors({});
  }

  function handleSubmit(formData: FormData) {
    const values = {
      full_name: formData.get("full_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    startTransition(async () => {
      const res = await createContact(values);
      setStatus(res.success ? "success" : "error");

      if (res.success) {
        resetForm();
      }
    });
  }

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <>
      <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-sm">
        <h3 className="text-2xl font-semibold mb-8">Send a Message</h3>

        <form action={handleSubmit} className="space-y-6">
          <div>
            <input
              name="full_name"
              placeholder="Full Name (Required)"
              value={formValues.full_name}
              onChange={(e) =>
                setFormValues({ ...formValues, full_name: e.target.value })
              }
              className="w-full border-b border-slate-300 py-3 focus:outline-none focus:border-black bg-transparent"
            />
            {errors.full_name && (
              <p className="text-xs text-red-500 mt-1">{errors.full_name}</p>
            )}
          </div>

          <div>
            <input
              name="email"
              type="email"
              placeholder="Email Address (Required)"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({ ...formValues, email: e.target.value })
              }
              className="w-full border-b border-slate-300 py-3 focus:outline-none focus:border-black bg-transparent"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              name="phone"
              placeholder="Phone (Required)"
              value={formValues.phone}
              onChange={(e) =>
                setFormValues({ ...formValues, phone: e.target.value })
              }
              className="w-full border-b border-slate-300 py-3 focus:outline-none focus:border-black bg-transparent"
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <input
              name="subject"
              placeholder="Subject (Required)"
              value={formValues.subject}
              onChange={(e) =>
                setFormValues({ ...formValues, subject: e.target.value })
              }
              className="w-full border-b border-slate-300 py-3 focus:outline-none focus:border-black bg-transparent"
            />
            {errors.subject && (
              <p className="text-xs text-red-500 mt-1">{errors.subject}</p>
            )}
          </div>

          <div>
            <textarea
              name="message"
              rows={4}
              placeholder="Your Message (Required)"
              value={formValues.message}
              onChange={(e) =>
                setFormValues({ ...formValues, message: e.target.value })
              }
              className="w-full border-b border-slate-300 py-3 focus:outline-none focus:border-black bg-transparent resize-none"
            />
            {errors.message && (
              <p className="text-xs text-red-500 mt-1">{errors.message}</p>
            )}
          </div>

          <button
            disabled={isPending || !isFormValid}
            className="w-full bg-black text-white py-4 rounded-2xl font-medium hover:bg-slate-900 transition active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isPending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <StatusModal status={status} onClose={() => setStatus(null)} />
    </>
  );
}