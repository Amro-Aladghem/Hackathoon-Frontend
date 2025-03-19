import { useNavigate } from 'react-router-dom';



export function Main() {

    const navigate = useNavigate();

    return (

        <>
            <section style={{direction:'rtl'}} className="px-2 py-16 bg-white md:px-0 rtl">
                <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5 ">
                    <div className="flex flex-wrap items-center sm:-mx-3">
                        <div className="w-full md:w-1/2 md:px-3">
                            <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                                    <span className="block xl:inline">أدوات  ذكاء اصطناعي</span>
                                    <br></br>
                                    <span className="block text-indigo-600 xl:inline">تساعدك على بناء نجاحك</span>
                                </h1>
                                <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                                    نرسم طريق النجاح لجميع الطلاب بتغيير طريقة التعلم المدعم بالذكاء الأصطناعي
                                </p>
                                <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                                    <a href="/bot/physics" className="flex font-extrabold items-center w-full px-6 py-3 mb-3 text-lg text-white bg-indigo-600 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto">
                                        جربه مجانا
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </a>
                                    <a href="#_" className="flex items-center px-6 py-3 font-extrabold text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600">
                                        تعلم المزيد
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
                            <video src="/OurVedio.mp4" autoPlay muted controls />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <div id="our-service-logo">
               <img src="/OurLogoFigure.png" width={"100px"} height={"100px"} />
               <h2 className="text-4xl font-extrabold tracking-tight text-indigo-600 sm:text-5xl md:text-4xl lg:text-5xl xl:text-4xl">أدواتنا المميزة</h2>
            </div>

            <section style={{direction:'rtl'}} className="px-2 py-16 bg-white md:px-0 rtl">
                <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5 ">
                    <div className="flex flex-wrap items-center sm:-mx-3">
                        <div className="w-full md:w-1/2 md:px-3">
                            <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                                <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                                    <span className="block xl:inline">صانع الأمتحانات</span>
                                    <br></br>
                                    <span className="block text-indigo-600 xl:inline">بالذكاء الأصطناعي</span>
                                </h2>
                                <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                                    حمل ملفك الدراسي pdf وأحصل على أسئلة تدريبية شاملة
                                </p>
                                <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                                    <a href="/tools/quizmaker" className="flex font-extrabold items-center w-full px-6 py-3 mb-3 text-lg text-white bg-indigo-600 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto">
                                        جربه الأن مجانا
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl 
                                            shadow-indigo-600/50 drop-shadow-[0_0_15px_rgba(67,56,202,0.5)]">
                                <img src="/quiz.png" className="w-full h-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section  className="px-2 py-16 bg-white md:px-0 rtl">
                <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5 ">
                    <div className="flex flex-wrap items-center sm:-mx-3">
                        <div className="w-full md:w-1/2 md:px-3">
                            <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                                <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                                    <span className="block xl:inline">منشئ المخطط الزمني</span>
                                    <br></br>
                                    <span className="block text-indigo-600 xl:inline">بالذكاء الأصطناعي</span>
                                </h2>
                                <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                                      لا داعي لترهق نفسك وتضيع وقتك  في التخطيط ,حمل ملفك الدراسي واستمتع بمخطط زمني فائق
                                </p>
                                <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                                    <a href="/tools/timetable" className="flex font-extrabold items-center w-full px-6 py-3 mb-3 text-lg text-white bg-indigo-600 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto">
                                        جربه الأن مجانا
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl 
                                            shadow-indigo-600/50 drop-shadow-[0_0_15px_rgba(67,56,202,0.5)]">
                                <img src="/TimeTable.png" className="w-full h-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section style={{direction:'rtl'}} className="px-2 py-16 bg-white md:px-0 rtl">
                <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5 ">
                    <div className="flex flex-wrap items-center sm:-mx-3">
                        <div className="w-full md:w-1/2 md:px-3">
                            <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                                <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                                    <span className="block xl:inline">اختبار ملائمة المجال</span>
                                    <br></br>
                                    <span className="block text-indigo-600 xl:inline">بالذكاء الأصطناعي</span>
                                </h2>
                                <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                                    اجب عن أسئلة تقيم اذا كانت المهنة أو المجال منساب لك ام لا
                                </p>
                                <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                                    <a href="/tools/review" className="flex font-extrabold items-center w-full px-6 py-3 mb-3 text-lg text-white bg-indigo-600 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto">
                                        جربه الأن مجانا
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl 
                                            shadow-indigo-600/50 drop-shadow-[0_0_15px_rgba(67,56,202,0.5)]">
                                <img src="/Review.png" className="w-full h-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="flex items-center justify-center py-5 ">
                <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl">
                    اسأل بوتات دردشة متخصصة بالعديد من المواد
                </h2>
            </div>

            <div className="w-full py-4">
                    <div className="w-full h-auto overflow-hidden flex items-center justify-center">
                        <img src="/BotsImage.png" className="w-250 py-4 h-auto rounded-2xl shadow-indigo-600/50 drop-shadow-[0_0_15px_rgba(67,56,202,0.5)]" />
                    </div>
            </div>

            <div className="flex space-x-4 justify-around my-16" style={{direction: 'rtl'}}>
                {/* card 1 */}
                <div className="max-w-sm w-1/5 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 shadow-indigo-600/50 drop-shadow-[0_0_15px_rgba(67,56,202,0.5)]"
                   onClick={()=>navigate("bot/mathematics")}
                   >
                    <a href="">
                        <img className="rounded-t-lg" src="/mathbot.jpg" alt="" />
                    </a>
                    <div className="p-5">
                        <a href="">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-indigo-600 dark:text-white">مادة الرياضيات</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">يستطيع مساعدتك بجميع المسائل الرياضية وفقا لمستواك الدراسي في الرياضيات</p>
                        <a href="" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            انتقل الأن
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </div>
                </div>
                {/*card 2  */}
                <div className="max-w-sm w-1/5 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 shadow-indigo-600/50 drop-shadow-[0_0_15px_rgba(67,56,202,0.5)]"
                onClick={()=>navigate("bot/physics")}
                >
                    <a href="">
                        <img className="rounded-t-lg" src="/physicsbot.jpg" alt="" />
                    </a>
                    <div className="p-5">
                        <a href="">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-indigo-600 dark:text-white">مادة الفيزياء</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">يستطيع مساعدتك بجميع المسائل الفيزيائية وفقا لمستواك الدراسي في الفيزياء</p>
                        <a href="" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                             انتقل الأن
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </div>
                </div>
                {/*card 3  */}
                <div className="max-w-sm w-1/5 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 shadow-indigo-600/50 drop-shadow-[0_0_15px_rgba(67,56,202,0.5)]"
                onClick={()=>navigate("bot/chemistry")}
                >
                    <a href="">
                        <img className="rounded-t-lg" src="/chemistbot.jpg" alt="" />
                    </a>
                    <div className="p-5">
                        <a href="">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-indigo-600 dark:text-white">مادة الكيمياء</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">يستطيع مساعدتك بجميع المسائل الكيميائية وفقا لمستواك الدراسي في الكيمياء</p>
                        <a href="" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                             انتقل الأن
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </div>
                </div>
                {/* card 4 */}
                <div className="max-w-sm w-1/5 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 shadow-indigo-600/50 drop-shadow-[0_0_15px_rgba(67,56,202,0.5)]"
                onClick={()=>navigate("bot/history")}
                >
                    <a href="">
                        <img className="rounded-t-lg" src="/historybot.jpg" alt="" />
                    </a>
                    <div className="p-5">
                        <a href="">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-indigo-600 dark:text-white">مادة التاريخ</h5>
                        </a>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">يستطيع مساعدنك بجميع المسائل التاريخية</p>
                        <br></br>
                        <a href="" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                             انتقل الأن
                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div className="bg-indigo-700">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
                    <div className="px-6 py-6 md:px-12 lg:flex lg:items-center lg:px-16">
                        <div className="lg:flex-1 xl:w-0">
                            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">النشرة البريدية</h2>
                            <p className="mt-3 max-w-3xl text-lg leading-6 text-indigo-200">اشترك في النشرة البريدية لكي تصلك كل التحديثات
                                </p>
                        </div>
                        <div className="mt-8 sm:w-full sm:max-w-md xl:mt-0 xl:ml-8">
                            <form className="sm:flex" id="revue-form" target="_blank">
                                <input type="email" autocomplete="email" required="" className="w-full rounded-md bg-white border-white px-5 py-3 placeholder-gray-500 focus:outline-none focus:ring-0" placeholder="Enter your email"/><button type="submit" className="mt-3 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-500 px-5 py-3 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-0 sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
                                onClick={()=>{alert("تم الأشتراك بنجاح")}}
                                >اشتراك</button>
                            </form>
                            <p className="mt-3 text-sm text-indigo-200">We will never send any spam emails. Promise.</p>
                        </div>
                    </div>
                </div>
           </div>

           


            
        </>


    );
}

export default Main;
