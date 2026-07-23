import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches
    if (!isFine) return

    document.body.classList.add('has-custom-cursor')

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    function onMove(e) {
      mouseX = e.clientX
      mouseY = e.clientY
      dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
    }

    function loop() {
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    function onOver(e) {
      if (e.target.closest('a, button')) ringRef.current.classList.add('cursor-hover')
    }
    function onOut(e) {
      if (e.target.closest('a, button')) ringRef.current.classList.remove('cursor-hover')
    }

    let raf = requestAnimationFrame(loop)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  )
}