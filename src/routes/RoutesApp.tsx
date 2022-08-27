import { Route, Routes } from 'react-router-dom'
//
import { HomePage, SignIn, Staff, Treatments } from '~/pages'

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/Staff" element={<Staff />} />
      <Route path="/Calendar" element={null} />
      <Route path="/Treatments" element={<Treatments />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/user/:id" element={null} />
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}
export default RoutesApp
