import Cart from "@/components/Cart/cart.tsx";

const Navbar = () => {
    return (
        <div className='z-40  flex items-center justify-end pr-8  h-14'>
            <Cart/>
        </div>
    )
}
export default Navbar