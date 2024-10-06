import { useEffect, useRef, useState } from "react";

const myList = [
  {
    text: 'a1' 
  },
  {
    text: 'a2' 
  },
  {
    text: 'a3' 
  },
  {
    text: 'a4' 
  },
  {
    text: 'a5' 
  },
  {
    text: 'a6' 
  },
]

const SelectedInputItems = ({ items }) => {
  return (
    <div className="">
      {(items || []).map(item => {
        const {text} = item || {}
        return (
          <div key={text} className="p-1 bg-[#f5f5f5] flex items-center gap-1">
            <span>{text}</span>
            <span style={
              // color: '#555'
            } onClick={() => {
            }}>x</span>
          </div>
        )
      })}
    </div>
  )
}
export const Dashboard: React.FC = () => {
  const ref = useRef(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [isFocused, setIsFocused] = useState(false)



  return (
    <div className="w-full h-[100dvh]" onClick={() => () => setIsFocused(false)}>
      <div style={{width: '300px', padding: '3px', display: 'flex', alignItems: 'center',
        border: `1px solid ${isFocused ? 'blue' : '#bbb'}`

      }}>
        <SelectedInputItems items={selectedItems} />
        <input autoFocus type='text' ref={ref} className="w-[300px]" value={''} onFocus={() => setIsFocused(true)}
        />
      </div>
      {isFocused ? (
        <div className="w-[300px] p-2">
          {myList.map((item) => {
            const {text} = item || {}
            return (
              <div key={text} className="w-full p-3" onClick={(e) => {
                e.stopPropagation()
                setSelectedItems(prevSelectedItems => ([...prevSelectedItems, item]))}}>{text}</div>
            )
          })}
        </div>
      ) : null}
    </div>
  );
};
