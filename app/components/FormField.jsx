import React from 'react'
import { Interface } from 'readline'


const FormField = (props) => {
  const [formData, setFormData] = useState({})
  const { } = props;

  function handleLongNameChange(e) {
    console.log(e);
    setFormData({
      ...formData,
      longname: e.target.value,
    });
  }
  return (
    <div className="space-y-2">
    <label className={tw_input_label}>Short Name</label>
    <div className="space-y-1">
        <input
        type="text"
        value={formData.shortname}
        onChange={handleShortNameChange}
        placeholder="Enter Short Name"
        className={tw_input_box_focus}
        />
    </div>
    </div>
  )
}

export default FormField