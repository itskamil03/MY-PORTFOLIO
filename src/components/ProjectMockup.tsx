'use client';

import React from 'react';
import { ShoppingBag, CheckCircle, BarChart3, ShieldCheck } from 'lucide-react';

interface ProjectMockupProps {
  projectId: string;
  title: string;
}

export function ProjectMockup({ projectId, title }: ProjectMockupProps) {
  const BrowserFrame = ({ children, url }: { children: React.ReactNode; url: string }) => (
    <div className="w-full h-full rounded-xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col text-left select-none">
      <div className="px-3.5 py-2 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="flex-1 mx-2 px-3 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-mono text-slate-500 truncate flex items-center justify-between">
          <span>{url}</span>
          <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-sans font-semibold">HTTPS 200 OK</span>
        </div>
      </div>
      <div className="flex-1 bg-white dark:bg-slate-900 p-4 sm:p-5 overflow-hidden flex flex-col justify-between relative text-slate-800 dark:text-slate-100">
        {children}
      </div>
    </div>
  );

  switch (projectId) {
    case 'swarn-bharat-one':
      return (
        <BrowserFrame url="https://swarnbharatone.com">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">SB</div>
                <span className="font-bold text-xs">Swarn Bharat Ecosystem</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-medium">Enterprise Portal</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <span className="text-[10px] text-slate-500 block">Active Users</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">12,450+</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <span className="text-[10px] text-slate-500 block">Rewards Issued</span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">₹4.8L+</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <span className="text-[10px] text-slate-500 block">Modules</span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">6 Live</span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold block text-slate-900 dark:text-white">Careers & Business Services</span>
                <span className="text-[9px] text-slate-500">Centralized database sync with Admin moderation panel</span>
              </div>
              <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-400">Sync Active</span>
            </div>
          </div>
        </BrowserFrame>
      );

    case 'khetan-admin-panel':
      return (
        <BrowserFrame url="http://187.77.142.79:3000">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span className="font-bold text-xs">Khetan Management Suite</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">Role: Super Admin</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <span className="text-[9px] text-slate-500 block">Pending Redemptions</span>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">28 Verification Requests</span>
              </div>
              <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <span className="text-[9px] text-slate-500 block">Catalog Status</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">142 In-Stock Items</span>
              </div>
            </div>
            <div className="p-2 rounded bg-slate-50 dark:bg-slate-800/40 text-[10px] font-mono space-y-1">
              <div className="flex justify-between text-slate-500">
                <span>TX_ID #9842</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">APPROVED</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>TX_ID #9841</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">REVIEWED</span>
              </div>
            </div>
          </div>
        </BrowserFrame>
      );

    case 'bhagat-engineering':
      return (
        <BrowserFrame url="https://bhagatengg.in">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-slate-800 dark:text-white" />
                <span className="font-bold text-xs">Bhagat Engineering</span>
              </div>
              <span className="text-[10px] text-slate-500">ISO Certified Firm</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900 text-white dark:bg-slate-800 space-y-1">
              <span className="text-[9px] text-blue-400 font-mono tracking-wider uppercase">Heavy Fabrication & Projects</span>
              <p className="text-xs font-semibold leading-tight">Precision Manufacturing & Industrial Infrastructure</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2 rounded border border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>100+ Completed Works</span>
              </div>
              <div className="p-2 rounded border border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>SEO Optimized Fast SSG</span>
              </div>
            </div>
          </div>
        </BrowserFrame>
      );

    case 'cartify-ecommerce':
    default:
      return (
        <BrowserFrame url="https://cartify-frontend-sable.vercel.app">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-xs">Cartify Store</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">Cart (3)</span>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-1/3 p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex flex-col justify-between">
                <div className="w-full h-10 rounded bg-slate-200 dark:bg-slate-700 mb-1" />
                <span className="text-[9px] font-semibold truncate block">Mechanical Keyboard</span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">₹3,499</span>
              </div>
              <div className="w-1/3 p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex flex-col justify-between">
                <div className="w-full h-10 rounded bg-slate-200 dark:bg-slate-700 mb-1" />
                <span className="text-[9px] font-semibold truncate block">Wireless ANC Headset</span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">₹5,999</span>
              </div>
              <div className="w-1/3 p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex flex-col justify-between">
                <div className="w-full h-10 rounded bg-slate-200 dark:bg-slate-700 mb-1" />
                <span className="text-[9px] font-semibold truncate block">Ergonomic Mouse</span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">₹1,899</span>
              </div>
            </div>
            <div className="p-2 rounded bg-emerald-50 dark:bg-emerald-950/40 text-[10px] text-emerald-700 dark:text-emerald-300 flex items-center justify-between">
              <span>JWT Auth • Persistent Cart • Filter Engine</span>
              <span className="font-semibold">MERN Stack</span>
            </div>
          </div>
        </BrowserFrame>
      );
  }
}
