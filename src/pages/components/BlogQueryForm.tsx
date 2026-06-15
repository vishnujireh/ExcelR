"use client";

export default function BlogQueryForm(){

return (

<div className="drop-query-form shadow-lg rounded-lg p-5 mt-10 ">

<div className="form-reply ui-form">


<h2 className="text-2xl font-bold mb-5 text-center text-[#FFAA33]">
Drop a Query
</h2>


<form>

<div className="grid md:grid-cols-2 gap-4">


<div className="col-md-6">
<input
className="border border-gray-200 text-gray-900 bg-[#F4F7FF] text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-lg"
placeholder="Name *"
/>
</div>


<div className="col-md-6">
<input
className="border border-gray-200 text-gray-900 bg-[#F4F7FF] text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-lg"
placeholder="Email *"
/>
</div>


<div className="col-md-6">
<input
className="border border-gray-200 text-gray-900 bg-[#F4F7FF] text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-lg"
placeholder="Mobile No *"
/>
</div>


<div className="col-md-6">
<input
className="border border-gray-200 text-gray-900 bg-[#F4F7FF] text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-lg"
placeholder="Location *"
/>
</div>
</div>
<div className="grid md:grid-cols-1 gap-4 mt-4">
<input
className="border border-gray-200 text-gray-900 bg-[#F4F7FF] text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 rounded-lg"
placeholder="Course *"
/>
</div>
<div className="text-center mt-5">

<button
className="flex items-center cursor-pointer gap-3 border border-solid border-[#0071BC] bg-[#0071BC] text-white hover:bg-[#4ba7de] font-medium text-sm py-2.5 px-4 rounded-lg"
>
Submit
</button>

</div>

</form>


</div>

</div>

)

}