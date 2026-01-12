export default function Header() {
  return (
    <div className="p-5 md:p-6">
      <div className="flex flex-col md:flex-row text-center md:text-start gap-6 items-center">
        <div>
          <h4 className="mb-1 text-xl font-semibold">
            School Overview Dashboard
          </h4>
          <p className="text-sm font-medium text-gray-500/80 leading-relaxed tracking-wide">
            Monitor daily attendance, staff availability, admissions, and key
            school activities in one place.
          </p>
        </div>
      </div>
    </div>
  );
}
