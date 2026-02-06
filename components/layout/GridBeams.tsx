export function GridBeams() {
    return (
        <div className="pointer-events-none fixed inset-0 z-0 mx-auto max-w-6xl px-4 md:px-6">
            {/* Left Beam */}
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-brand-cyan/20" />
            {/* Right Beam */}
            <div className="absolute right-4 md:right-6 top-0 bottom-0 w-px bg-brand-cyan/20" />
        </div>
    );
}
