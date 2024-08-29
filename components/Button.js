
 
export function ButtonVariants({btn_title}) {
  return (
    <span>
      <button className="font-mono border-2 border-cyan-900 bg-cyan-900 px-10 py-2 text-white rounded-xl hover:bg-cyan-400 hover:border-cyan-100 font-bold">{btn_title}</button>
    </span>
   
  );
}