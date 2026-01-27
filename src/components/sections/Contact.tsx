import { sendMessage } from "@/src/firebase/services";
import { addNewMessage } from "@/src/redux/features/MessageSlice";
import { RootState } from "@/src/redux/store";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();
  const [loading, setLoading] = useState(false);
  const aboutData=useSelector((state:RootState)=>state.about)
  const dispatch = useDispatch();
  const onSubmit = async (data: ContactFormData, e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);


    const res = await sendMessage(data);

    if (res.success && res.id) {
      setLoading(false);
      dispatch(addNewMessage({ ...data, _id: res.id }));
      toast.info("Thank you for your message! I will get back to you soon.");
      reset();
    } else {
      setLoading(false);
      toast.error("Opps! Something went wrong, Please Try Again");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="flex flex-col justify-center">
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20 mb-4">
                  Available for freelance
                </span>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                  Let's build something <br className="hidden sm:block" />{" "}
                  extraordinary together.
                </h2>
                <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
                  Have a project in mind or just want to discuss the latest
                  tech? I'm always open to new ideas and collaborations. Drop me
                  a line!
                </p>
              </div>
              <div className="pt-8 space-y-4">
                <div className="flex items-center gap-4 text-slate-300 hover:text-primary transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                    <span className="material-symbols-outlined text-xl">
                      mail
                    </span>
                  </div>
                  <span className="text-base font-medium">
                   {  aboutData?.contact_details?.email || 'hussnainalix01@gmail.com'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-slate-300 hover:text-primary transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                    <span className="material-symbols-outlined text-xl">
                      location_on
                    </span>
                  </div>
                  <span className="text-base font-medium">
                   {aboutData?.location.city || 'Earth'}, {aboutData?.location?.country || 'Universe'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative glass-card bg-glass-bg border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm font-medium text-slate-300">
                      Name
                    </span>
                    <div className="relative">
                      <input
                        {...register("name", { required: "Name is required" })}
                        className="w-full bg-background-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="John Doe"
                      />
                      <span className="material-symbols-outlined absolute right-3 top-3.5 text-slate-500 text-lg pointer-events-none">
                        person
                      </span>
                    </div>
                    {errors.name && (
                      <span className="text-xs text-red-400">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <span className="text-sm font-medium text-slate-300">
                      Email
                    </span>
                    <div className="relative">
                      <input
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email",
                          },
                        })}
                        className="w-full bg-background-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        placeholder="john@example.com"
                      />
                      <span className="material-symbols-outlined absolute right-3 top-3.5 text-slate-500 text-lg pointer-events-none">
                        alternate_email
                      </span>
                    </div>
                    {errors.email && (
                      <span className="text-xs text-red-400">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-medium text-slate-300">
                    Subject
                  </span>
                  <div className="relative">
                    <select
                      {...register("subject")}
                      className="w-full bg-background-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none"
                    >
                      <option>Project Inquiry</option>
                      <option>Consulting</option>
                      <option>Job Opportunity</option>
                      <option>Just saying hi</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-3.5 text-slate-500 text-lg pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-medium text-slate-300">
                    Message
                  </span>
                  <textarea
                    {...register("message", {
                      required: "Message is required",
                    })}
                    rows={4}
                    className="w-full bg-background-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <span className="text-xs text-red-400">
                      {errors.message.message}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="cursor-pointer group w-full bg-gradient-to-r from-primary to-blue-400 hover:from-blue-400 hover:to-primary text-background-dark font-bold py-3.5 px-6 rounded-lg transition-all transform hover:-translate-y-0.5 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  <span>{loading ? "Sending..." : "Send Message"}</span>
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                    send
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
