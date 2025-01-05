
const Message = ( {variants,children}) => {
    const getVariantsClasses = () => {
        switch (variants) {
            case "success":
                return "bg-green-100 text-green-800"
            case "danger" :
                return "bg-red-100 text-red-800"
            default:
                return "bg-blue-100 text-blue-800"
        }
    }
  return (
    <div className={`p-4 rounded ${getVariantsClasses()}`}>{children}</div>
  )
}

export default Message