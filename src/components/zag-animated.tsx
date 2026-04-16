"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ZagAnimatedProps {
  size?: number;
  className?: string;
}

export function ZagAnimated({ size = 180, className = "" }: ZagAnimatedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [blinking, setBlinking] = useState(false);

  // Mouse tracking
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 150, damping: 15 });
  const springY = useSpring(rawY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      rawX.set(Math.max(-5, Math.min(5, (e.clientX - cx) / 40)));
      rawY.set(Math.max(-4, Math.min(4, (e.clientY - cy) / 50)));
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  // Blink every 3-4s
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    function scheduleBlink() {
      timeout = setTimeout(() => {
        setBlinking(true);
        setTimeout(() => {
          setBlinking(false);
          scheduleBlink();
        }, 150);
      }, 3000 + Math.random() * 1500);
    }
    scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  const eyeRY = blinking ? 0.5 : 11;

  // Pupil positions: base + mouse offset
  const leftIrisCX = useTransform(springX, (v) => 177 + v);
  const rightIrisCX = useTransform(springX, (v) => 223 + v);
  const leftPupilCX = useTransform(springX, (v) => 177 + v);
  const rightPupilCX = useTransform(springX, (v) => 223 + v);
  const pupilCY = useTransform(springY, (v) => 216 + v);

  // Reflections follow too
  const leftReflectCX = useTransform(springX, (v) => 179 + v);
  const rightReflectCX = useTransform(springX, (v) => 225 + v);
  const leftReflect2CX = useTransform(springX, (v) => 174 + v);
  const rightReflect2CX = useTransform(springX, (v) => 220 + v);

  return (
    <div ref={ref} className={`inline-block shrink-0 ${className}`} style={{ width: size, height: size }}>
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ scale: [1, 1.008, 1] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        {/* Background — subtle transparent circle */}
        <circle cx="200" cy="200" r="200" fill="var(--surface)" opacity="0.5" />

        {/* Neck */}
        <path d="M170 310 L170 345 Q170 365 200 365 Q230 365 230 345 L230 310" fill="#E8B896" />

        {/* T-shirt */}
        <path d="M125 400 Q128 345 170 330 L170 345 Q170 365 200 365 Q230 365 230 345 L230 330 Q272 345 275 400 Z" fill="#1c1917" />
        <path d="M170 330 Q185 340 200 342 Q215 340 230 330" stroke="#2a2520" strokeWidth="1" fill="none" />

        {/* Face */}
        <path d="M135 210 Q132 170 155 155 Q170 145 200 143 Q230 145 245 155 Q268 170 265 210 Q265 260 245 285 Q230 302 200 308 Q170 302 155 285 Q135 260 135 210Z" fill="#EDBE9E" />

        {/* Ears */}
        <ellipse cx="132" cy="220" rx="11" ry="17" fill="#DBA882" />
        <ellipse cx="268" cy="220" rx="11" ry="17" fill="#DBA882" />
        <ellipse cx="132" cy="220" rx="6" ry="10" fill="#D4A278" opacity="0.3" />
        <ellipse cx="268" cy="220" rx="6" ry="10" fill="#D4A278" opacity="0.3" />

        {/* Jaw shadow */}
        <path d="M160 270 Q180 300 200 305 Q220 300 240 270 Q248 258 248 248 L152 248 Q152 258 160 270Z" fill="#C9A07A" opacity="0.12" />

        {/* Left eye */}
        <motion.ellipse cx="175" cy="215" rx="16" animate={{ ry: eyeRY }} transition={{ duration: 0.08 }} fill="white" />
        <motion.circle r="8" fill="#5B9E5A" style={{ cx: leftIrisCX, cy: pupilCY }} />
        <motion.circle r="4.5" fill="#2D5A2D" style={{ cx: leftPupilCX, cy: pupilCY }} />
        {!blinking && (
          <>
            <motion.circle r="2.2" fill="white" opacity="0.9" style={{ cx: leftReflectCX, cy: 213 }} />
            <motion.circle r="1" fill="white" opacity="0.4" style={{ cx: leftReflect2CX, cy: 219 }} />
          </>
        )}
        <path d="M162 221 Q175 226 188 221" stroke="#CFA07A" strokeWidth="0.8" fill="none" opacity="0.5" />

        {/* Right eye */}
        <motion.ellipse cx="225" cy="215" rx="16" animate={{ ry: eyeRY }} transition={{ duration: 0.08 }} fill="white" />
        <motion.circle r="8" fill="#5B9E5A" style={{ cx: rightIrisCX, cy: pupilCY }} />
        <motion.circle r="4.5" fill="#2D5A2D" style={{ cx: rightPupilCX, cy: pupilCY }} />
        {!blinking && (
          <>
            <motion.circle r="2.2" fill="white" opacity="0.9" style={{ cx: rightReflectCX, cy: 213 }} />
            <motion.circle r="1" fill="white" opacity="0.4" style={{ cx: rightReflect2CX, cy: 219 }} />
          </>
        )}
        <path d="M212 221 Q225 226 238 221" stroke="#CFA07A" strokeWidth="0.8" fill="none" opacity="0.5" />

        {/* Eyebrows — lift on blink */}
        <motion.path
          stroke="#3D2B1F" strokeWidth="2.8" strokeLinecap="round" fill="none"
          animate={{ d: blinking ? "M155 198 Q165 191 188 195" : "M155 200 Q165 193 188 197" }}
          transition={{ duration: 0.08 }}
        />
        <motion.path
          stroke="#3D2B1F" strokeWidth="2.8" strokeLinecap="round" fill="none"
          animate={{ d: blinking ? "M212 195 Q235 191 245 198" : "M212 197 Q235 193 245 200" }}
          transition={{ duration: 0.08 }}
        />

        {/* Nose */}
        <path d="M200 218 Q197 238 194 248" stroke="#CFA07A" strokeWidth="1.5" fill="none" />
        <path d="M189 252 Q194 257 200 256 Q206 257 211 252" stroke="#CFA07A" strokeWidth="1.5" fill="none" />

        {/* Mouth — friendly smile */}
        <path d="M178 275 Q188 288 200 289 Q212 288 222 275" stroke="#C47A5A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M182 275 Q191 270 200 272 Q209 270 218 275" stroke="#C47A5A" strokeWidth="1" fill="none" opacity="0.4" />
        <path d="M180 275 Q190 286 200 287 Q210 286 220 275 Z" fill="#C4564A" opacity="0.15" />
        <path d="M186 277 L214 277" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.6" />

        {/* Hair */}
        <path d="M120 190 Q115 140 140 110 Q160 88 200 82 Q240 88 260 110 Q285 140 280 190 L275 175 Q272 140 255 118 Q235 95 200 90 Q165 95 145 118 Q128 140 125 175 Z" fill="#2A1810" />
        <circle cx="148" cy="110" r="20" fill="#2A1810" />
        <circle cx="170" cy="95" r="22" fill="#2A1810" />
        <circle cx="195" cy="85" r="22" fill="#2A1810" />
        <circle cx="220" cy="88" r="21" fill="#2A1810" />
        <circle cx="242" cy="98" r="20" fill="#2A1810" />
        <circle cx="258" cy="115" r="18" fill="#2A1810" />
        <circle cx="138" cy="130" r="17" fill="#2A1810" />
        <circle cx="155" cy="100" r="16" fill="#2A1810" />
        <circle cx="182" cy="82" r="18" fill="#2A1810" />
        <circle cx="208" cy="80" r="17" fill="#2A1810" />
        <circle cx="232" cy="85" r="17" fill="#2A1810" />
        <circle cx="252" cy="105" r="15" fill="#2A1810" />
        <circle cx="165" cy="78" r="12" fill="#2A1810" />
        <circle cx="190" cy="72" r="13" fill="#2A1810" />
        <circle cx="210" cy="73" r="12" fill="#2A1810" />
        <circle cx="235" cy="80" r="11" fill="#2A1810" />
        <circle cx="125" cy="155" r="14" fill="#2A1810" />
        <circle cx="122" cy="175" r="12" fill="#2A1810" />
        <circle cx="124" cy="195" r="10" fill="#2A1810" />
        <circle cx="275" cy="155" r="14" fill="#2A1810" />
        <circle cx="278" cy="175" r="12" fill="#2A1810" />
        <circle cx="276" cy="195" r="10" fill="#2A1810" />

        {/* Hair highlights */}
        <circle cx="160" cy="95" r="10" fill="#3D2B1F" />
        <circle cx="185" cy="80" r="10" fill="#3D2B1F" />
        <circle cx="210" cy="78" r="9" fill="#3D2B1F" />
        <circle cx="235" cy="88" r="9" fill="#3D2B1F" />
        <circle cx="250" cy="108" r="8" fill="#3D2B1F" />
        <circle cx="145" cy="118" r="8" fill="#3D2B1F" />
        <circle cx="175" cy="75" r="7" fill="#3D2B1F" />
        <circle cx="200" cy="72" r="7" fill="#3D2B1F" />
        <circle cx="222" cy="76" r="6" fill="#3D2B1F" />
        <circle cx="128" cy="145" r="7" fill="#3D2B1F" />
        <circle cx="272" cy="145" r="7" fill="#3D2B1F" />

        {/* Curl details */}
        <path d="M155 95 Q162 82 172 88" stroke="#4A3528" strokeWidth="1.2" fill="none" opacity="0.4" />
        <path d="M188 78 Q195 68 205 75" stroke="#4A3528" strokeWidth="1.2" fill="none" opacity="0.4" />
        <path d="M220 82 Q228 72 238 80" stroke="#4A3528" strokeWidth="1.2" fill="none" opacity="0.4" />
        <path d="M170 90 Q177 80 185 85" stroke="#4A3528" strokeWidth="1" fill="none" opacity="0.3" />
        <path d="M205 76 Q212 68 220 73" stroke="#4A3528" strokeWidth="1" fill="none" opacity="0.3" />

        {/* Forehead edge */}
        <path d="M142 165 Q150 152 162 155" stroke="#2A1810" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M258 165 Q250 152 238 155" stroke="#2A1810" strokeWidth="6" strokeLinecap="round" fill="none" />
      </motion.svg>
    </div>
  );
}
