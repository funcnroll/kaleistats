function OnoffSlider({
  statePseudoanonymisation,
  onClick,
}: {
  statePseudoanonymisation: boolean | undefined;
  onClick: () => void;
}) {
  // https://www.material-tailwind.com/docs/html/switch
  return (
    <div className="relative inline-block w-11 h-5">
      <input
        checked={statePseudoanonymisation}
        onChange={onClick}
        id="switch-component"
        type="checkbox"
        className="peer appearance-none w-11 h-5 bg-red-500 rounded-full checked:bg-green-500 cursor-pointer transition-colors duration-300"
      />
      <label
        htmlFor="switch-component"
        className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
      ></label>
    </div>
  );
}

export default OnoffSlider;
