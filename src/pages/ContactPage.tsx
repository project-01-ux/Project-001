import React, { useState } from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Mail, MapPin, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const breadcrumbs = [{ name: 'Contact Support', url: '/contact/' }];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <SEO
        title="Contact Us & Platform Support | Bangalore Companions Directory"
        description="Contact Bangalore Companions platform administration for advertising support, listing updates, legal notices, or general inquiries."
        canonicalUrl="/contact/"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="space-y-2">
            <span className="bg-rose-100 text-rose-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <Mail size={14} /> Directory Support
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Contact Bangalore Companions Administration
            </h1>
            <p className="text-slate-600 text-base leading-relaxed">
              Have questions regarding advertising options, technical support, or profile management? Get in touch with our team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            <div className="md:col-span-5 space-y-4 text-sm text-slate-600">
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Support Email</span>
                    <span className="font-semibold text-slate-900 text-xs sm:text-sm">support@bangalorecompanions.demo</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Location</span>
                    <span className="font-semibold text-slate-900 text-xs sm:text-sm">Bangalore, KA 560034, India</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose-100 text-rose-600 rounded-lg">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-bold uppercase">Response Time</span>
                    <span className="font-semibold text-slate-900 text-xs sm:text-sm">Within 24 Business Hours</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center space-y-3">
                  <CheckCircle2 size={40} className="text-emerald-600 mx-auto" />
                  <h3 className="text-xl font-bold text-slate-900">Message Delivered</h3>
                  <p className="text-sm text-slate-600">
                    Thank you for contacting Bangalore Companions support. Our team will review your inquiry shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-rose-500 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-rose-500 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      placeholder="Advertising / Support Inquiry"
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-rose-500 outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Message</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Provide details about your question..."
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:border-rose-500 outline-hidden"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-xl shadow-xs transition-colors text-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send size={16} />
                    <span>Send Support Message</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
