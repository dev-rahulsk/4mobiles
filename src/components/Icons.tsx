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

export const Icon = {
  Search, Phone, Tablet, Laptop, Watch, Battery, Drop, Crack, Speaker,
  Camera, Wrench, Check, Pin, Clock, Shield, Euro, Park, Calendar, Truck,
  Star, ArrowRight, Chat, Plus, Menu, Cart, WhatsApp, X, Quote, MapLink,
}
