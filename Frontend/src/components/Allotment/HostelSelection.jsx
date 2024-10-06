import React from 'react'

export default function HostelSelection() {
  return (
    <div>
      <div className="flex"></div>
      <div className="flex">
      <ul class="w-fit flex flex-col">
  <li class="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-600 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
    <div class="flex items-center">
      <input id="list-group-item-radio-1" type="radio" name="list-group-item-radio" class="hidden peer" checked/>
      <label for="list-group-item-radio-1" class="flex items-center cursor-pointer text-gray-600 text-sm font-normal">
        <span class="border border-gray-300 rounded-full mr-2 w-4 h-4 peer-checked:border-indigo-500 peer-checked:bg-indigo-100"></span> Radio button 1
      </label>
    </div>
  </li>
  
  <li class="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
    <div class="flex items-center">
      <input id="list-group-item-radio-2" type="radio" name="list-group-item-radio" class="hidden peer"/>
      <label for="list-group-item-radio-2" class="flex items-center cursor-pointer text-gray-600 text-sm font-normal">
        <span class="border border-gray-300 rounded-full mr-2 w-4 h-4 peer-checked:border-indigo-500 peer-checked:bg-indigo-100"></span> Radio button 2
      </label>
    </div>
  </li>
  
  <li class="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg">
    <div class="flex items-center">
      <input id="list-group-item-radio-3" type="radio" name="list-group-item-radio" class="hidden peer"/>
      <label for="list-group-item-radio-3" class="flex items-center cursor-pointer text-gray-600 text-sm font-normal">
        <span class="border border-gray-300 rounded-full mr-2 w-4 h-4 peer-checked:border-indigo-500 peer-checked:bg-indigo-100"></span> Radio button 3
      </label>
    </div>
  </li>
</ul>

      </div>
    </div>
  )
}
