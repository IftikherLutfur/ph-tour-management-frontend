import logo from "../../../assets/images/Background - 2025-08-07T175433.066.png"

export default function Footer () {
return (
    <>
    <footer className="bg-white">
  <div className="px-5 pt-10">
    <div className="lg:flex lg:items-start lg:gap-8">
      
   <img className="h-16" src={logo} alt="" />
      <div className="mt-8 grid grid-cols-2 gap-8 lg:mt-0 lg:grid-cols-5 lg:gap-y-16">
        <div className="col-span-2">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Get the latest news!</h2>

            <p className="mt-4 text-gray-500">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse non cupiditate quae nam
              molestias.
            </p>
          </div>
        </div>
      </div>
    </div>

   
  </div>
</footer>
    </>
)
}