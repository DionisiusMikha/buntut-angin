import SideNavbar from "./components/SideNavbar";

function Profile(){
    return(
    <div className="bg-[#f3f3fd] flex flex-row justify-center w-full">
      <div className="bg-[#f3f3fd] w-[1920px] h-[1080px]">
        <div className="relative w-[1132px] h-[1027px] top-[17px] left-[300px] bg-white rounded-[20px] overflow-hidden border border-solid border-[#d8e4e9] shadow-[0px_4px_4px_#00000040]">
          <div className="absolute w-[1052px] h-[192px] top-[324px] left-[46px]">
            <div className="absolute w-[121px] top-0 left-[2px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#384d6c] text-[16px] tracking-[0] leading-[normal]">
              First Name
            </div>
            <div className="absolute w-[497px] h-[52px] top-[36px] left-0 bg-white rounded-[8px] border border-solid border-gray-300">
              <div className="absolute top-[10px] left-[18px] [font-family:'Satoshi-Italic',Helvetica] font-normal italic text-[#abb0bb] text-[16px] tracking-[0] leading-[normal]">
                ooopopo
              </div>
            </div>
            <div className="absolute w-[121px] top-0 left-[543px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#384d6c] text-[16px] tracking-[0] leading-[normal]">
              Last Name
            </div>
            <div className="w-[497px] left-[543px] absolute h-[52px] top-[36px] bg-white rounded-[8px] border border-solid border-gray-300">
              <div className="absolute top-[10px] left-[22px] [font-family:'Satoshi-Italic',Helvetica] font-normal italic text-[#abb1bb] text-[16px] tracking-[0] leading-[normal]">
                ppepepepep
              </div>
            </div>
            <div className="absolute w-[121px] top-[104px] left-0 [font-family:'Satoshi-Bold',Helvetica] font-bold text-[#384d6c] text-[16px] tracking-[0] leading-[normal]">
              User Name
            </div>
            <div className="absolute w-[1038px] h-[52px] top-[140px] left-[2px] bg-white rounded-[8px] border border-solid border-gray-300">
              <div className="absolute top-[14px] left-[16px] [font-family:'Satoshi-Italic',Helvetica] font-normal italic text-[#abb1bb] text-[16px] tracking-[0] leading-[normal]">
                eg. alaa.mohamed
              </div>
            </div>
          </div>
          <img
            className="absolute w-[1040px] h-px top-[255px] left-[46px] object-cover"
            alt="Line"
            src="line-136.svg"
          />
          <div className="absolute w-[1044px] h-[88px] top-[558px] left-[46px]">
            <div className="absolute w-[121px] top-0 left-[2px] [font-family:'Montserrat-Bold',Helvetica] font-bold text-[#384d6c] text-[16px] tracking-[0] leading-[normal]">
              Email Address
            </div>
            <div className="absolute w-[497px] h-[52px] top-[36px] left-0 bg-white rounded-[8px] border border-solid border-gray-300">
              <img className="absolute w-[28px] h-[28px] top-[11px] left-[18px]" alt="Mail" src="mail.svg" />
            </div>
            <div className="absolute w-[131px] top-0 left-[543px] [font-family:'Montserrat-Bold',Helvetica] font-bold text-[#384d6c] text-[16px] tracking-[0] leading-[normal]">
              Phone Number
            </div>
            <div className="w-[497px] left-[543px] absolute h-[52px] top-[36px] bg-white rounded-[8px] border border-solid border-gray-300">
              <img className="absolute w-[28px] h-[28px] top-[11px] left-[20px]" alt="Phone" src="phone.svg" />
            </div>
          </div>
          <div className="absolute w-[1042px] h-[192px] top-[689px] left-[44px]">
            <div className="w-[493px] top-0 left-0 absolute h-[88px]">
              <div className="absolute w-[151px] top-0 left-0 [font-family:'Montserrat-Bold',Helvetica] font-bold text-[#384d6c] text-[16px] tracking-[0] leading-[normal]">
                Current Password
              </div>
              <div className="w-[489px] left-[2px] absolute h-[52px] top-[36px] bg-white rounded-[8px] border border-solid border-gray-300">
                <img
                  className="absolute w-[34px] h-[34px] top-[8px] left-[15px]"
                  alt="Key undefined glyph"
                  src="glyph-undefined.svg"
                />
                <img className="absolute w-[24px] h-[24px] top-[13px] left-[444px]" alt="Frame" src="frame.svg" />
              </div>
            </div>
            <div className="w-[509px] top-0 left-[535px] absolute h-[88px]">
              <div className="absolute w-[151px] top-0 left-0 [font-family:'Montserrat-Bold',Helvetica] font-bold text-[#384d6c] text-[16px] tracking-[0] leading-[normal]">
                New Password
              </div>
              <div className="absolute w-[505px] h-[52px] top-[36px] left-[2px] bg-white rounded-[8px] border border-solid border-gray-300">
                <img
                  className="top-[8px] left-[20px] absolute w-[34px] h-[34px]"
                  alt="Key undefined glyph"
                  src="image.svg"
                />
                <img className="absolute w-[24px] h-[24px] top-[13px] left-[453px]" alt="Frame" src="frame-2.svg" />
              </div>
            </div>
            <div className="w-[1042px] top-[104px] left-[2px] absolute h-[88px]">
              <div className="absolute w-[199px] top-0 left-0 [font-family:'Montserrat-Bold',Helvetica] font-bold text-[#384d6c] text-[16px] tracking-[0] leading-[normal]">
                Confirm New Password
              </div>
              <div className="absolute w-[1038px] h-[52px] top-[36px] left-[2px] bg-white rounded-[8px] border border-solid border-gray-300">
                <img
                  className="top-[9px] left-[13px] absolute w-[34px] h-[34px]"
                  alt="Key undefined glyph"
                  src="glyph-undefined-2.svg"
                />
                <img className="absolute w-[24px] h-[24px] top-[15px] left-[986px]" alt="Frame" src="frame-3.svg" />
              </div>
            </div>
          </div>
          <button className="flex flex-col w-[188px] h-[68px] items-center justify-center gap-[8px] pl-[21px] pr-[19px] py-[10px] absolute top-[932px] left-[904px] bg-blue-800 rounded-[8px] overflow-hidden border-[3px] border-solid border-peakprimary">
            <div className="relative w-fit [font-family:'Montserrat-Bold',Helvetica] font-bold text-white text-[14px] tracking-[0] leading-[21px] whitespace-nowrap">
              Save Changes
            </div>
          </button>
          <button className="flex w-[176px] h-[56px] items-center justify-center px-0 py-[8px] absolute top-[938px] left-[684px] bg-white rounded-[8px] overflow-hidden border border-solid border-peakprimary all-[unset] box-border">
            <div className="relative w-fit [font-family:'Montserrat-Bold',Helvetica] font-bold text-[#384d6c] text-[14px] text-center tracking-[0] leading-[21px] whitespace-nowrap">
              Cancel
            </div>
          </button>
          <div className="absolute w-[1040px] h-[222px] top-[33px] left-[46px] rounded-[20px]">
            <div className="absolute w-[1040px] h-[222px] top-0 left-0 bg-white rounded-[20px] overflow-hidden border border-solid border-[#d8e4e9] shadow-[0px_4px_4px_#00000040]">
              <div className="inline-flex items-center gap-[10px] absolute top-[18px] left-[699px]">
                <img className="relative w-[26px] h-[26px]" alt="Bold essentional UI" src="https://iili.io/JxP0Hml.png" />
                <div className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[19.2px] whitespace-nowrap">
                  NON-PREMIUM
                </div>
                <div className="relative w-fit [font-family:'Inter-Regular',Helvetica] font-normal text-black text-[16px] tracking-[0] leading-[19.2px] whitespace-nowrap">
                  ｜MEMBER：123948
                </div>
              </div>
              <div className="absolute top-[59px] left-[258px] [font-family:'Satoshi-Bold',Helvetica] font-bold text-black text-[25px] tracking-[0] leading-[normal]">
                Cecilia
              </div>
              <div className="absolute top-[103px] left-[258px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-black text-[18px] tracking-[0] leading-[normal]">
                BB : 46 Kg
              </div>
              <div className="absolute top-[137px] left-[258px] [font-family:'Satoshi-Regular',Helvetica] font-normal text-black text-[18px] tracking-[0] leading-[normal]">
                TB : 168 Cm
              </div>
            </div>
            <div className="absolute w-[200px] h-[200px] top-[11px] left-[22px] bg-[url(march7-1.png)] bg-cover bg-[50%_50%]">
              <img
                className="absolute w-[48px] h-[46px] top-[156px] left-[133px]"
                alt="pen"
                src="https://iili.io/JxPcVup.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Profile;