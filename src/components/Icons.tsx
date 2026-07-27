import { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const Search = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
)

const Phone = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
    <path d="M10 18.5h4" />
  </svg>
)

const Tablet = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3.5" y="3" width="17" height="18" rx="2" />
    <path d="M10 18h4" />
  </svg>
)

const Laptop = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="4" y="5" width="16" height="11" rx="1.5" />
    <path d="M2 19h20" />
  </svg>
)

const Watch = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="6.5" y="6.5" width="11" height="11" rx="2.5" />
    <path d="M9 6.5 9.5 3h5L15 6.5M9 17.5 9.5 21h5l.5-3.5" />
  </svg>
)

const Battery = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="2.5" y="7.5" width="17" height="9" rx="1.6" />
    <path d="M21 10.5v3" />
    <path d="M6 12h6" />
  </svg>
)

const Drop = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11Z" />
  </svg>
)

const Crack = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
    <path d="m9 7 2 4-3 2 4 2-2 4" />
  </svg>
)

const Speaker = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M4 9.5h3l5-4v13l-5-4H4z" />
    <path d="M16 9a4 4 0 0 1 0 6" />
    <path d="M18.5 6.5a7.5 7.5 0 0 1 0 11" />
  </svg>
)

const Camera = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3 7.5h4l1.5-2h7L17 7.5h4v11.5H3z" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
)

const Wrench = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M14.5 3.5a4.5 4.5 0 0 0-5.7 5.5L3 14.8 6.2 18l5.8-5.8a4.5 4.5 0 0 0 5.5-5.7l-2.7 2.7-2.5-.5-.5-2.5z" />
  </svg>
)

const Check = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="m4.5 12.5 4.5 4.5L20 6" />
  </svg>
)

const Pin = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

const Clock = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </svg>
)

const Shield = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 3 4 6v6c0 4.5 3.5 8 8 9 4.5-1 8-4.5 8-9V6z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

const Euro = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M18 6.5a7 7 0 1 0 0 11" />
    <path d="M4 10h9M4 14h9" />
  </svg>
)

const Park = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M9 17V8h4a3 3 0 0 1 0 6H9" />
  </svg>
)

const Calendar = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3.5" y="5" width="17" height="15" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </svg>
)

const Truck = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M2 6h11v10H2zM13 9h5l3 3v4h-8z" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>
)

const Star = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="m12 3 2.7 5.5 6 .9-4.4 4.3 1 6L12 16.9 6.7 19.7l1-6L3.4 9.4l6-.9z" />
  </svg>
)

const ArrowRight = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const Chat = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M4 5h16v11H8l-4 3z" />
  </svg>
)

const Plus = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}>
    <path d="M12 5v14M5 12h14" />
  </svg>
)

const Menu = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

const Cart = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3 4h2.5l2 12h11l2-8H7" />
    <circle cx="9" cy="20" r="1.5" />
    <circle cx="18" cy="20" r="1.5" />
  </svg>
)

const WhatsApp = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.985-1.409A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.065-1.117l-.29-.173-3.01.851.806-2.938-.19-.302A7.96 7.96 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/>
  </svg>
)

const X = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)

const Quote = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
  </svg>
)

const MapLink = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
    <line x1="9" y1="3" x2="9" y2="18"/>
    <line x1="15" y1="6" x2="15" y2="21"/>
  </svg>
)

const ChevronDown = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

const ChevronRight = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="m9 18 6-6-6-6" />
  </svg>
)

const Zap = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
)

const Google = (p: IconProps) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...p}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

const ChevronLeft = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="m15 18-6-6 6-6" />
  </svg>
)

const Apple = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.35c.67-.82 1.13-1.96.99-3.1-.97.04-2.17.65-2.86 1.46-.61.71-1.15 1.87-.99 3.01 1.09.08 2.22-.55 2.86-1.37z" />
  </svg>
)

const Users = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const Headset = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3 11a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h3" />
    <path d="M3 14h3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7z" />
  </svg>
)

const Devices = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="2" y="5" width="10" height="14" rx="2" />
    <rect x="13" y="8" width="9" height="11" rx="1.5" />
    <path d="M7 16h.01" />
  </svg>
)

const Accessory = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="5" y="4" width="14" height="11" rx="2" />
    <path d="M9 15v3M15 15v3M12 18v3" />
  </svg>
)

const Info = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8h.01M12 12v4" />
  </svg>
)

const HelpCircle = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
)

const User = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const Scale = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="M7 21h10M12 3v18M3 7h18" />
  </svg>
)

const ShieldCheck = (p: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)

export const Icon = {
  Search, Phone, Tablet, Laptop, Watch, Battery, Drop, Crack, Speaker,
  Camera, Wrench, Check, Pin, Clock, Shield, Euro, Park, Calendar, Truck,
  Star, ArrowRight, Chat, Plus, Menu, Cart, WhatsApp, X, Quote, MapLink,
  ChevronDown, ChevronLeft, ChevronRight, Zap, Google, Apple, Users, Headset, Devices, Accessory, Info, HelpCircle, User, Scale, ShieldCheck,
}


