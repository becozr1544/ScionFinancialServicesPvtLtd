import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MOBILE_REGEX = /^[6-9]\d{9}$/;

const MobileLogin: React.FC = () => {
  const [step, setStep] = useState(0);
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const navigate = useNavigate();

  function handleMobileSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!MOBILE_REGEX.test(mobile)) {
      setMobileError("Enter a valid 10-digit mobile number");
      return;
    }
    setMobileError("");
    setStep(1);
  }

  function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (otp !== "1111") {
      setOtpError('Invalid OTP. Please enter “1111”.');
      return;
    }
    setOtpError("");
    navigate("/apply-loan");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#4B1FA7]">
      {/* Left Section - Offer & Wheel */}
      <div className="flex-1 flex flex-col justify-center items-center bg-gradient-to-br from-[#4B1FA7] via-[#8B05FF] to-[#00D4FF] px-6 py-10">
        <div className="max-w-md w-full">
          <img
            src="https://cdn.paisabazaar.com/images/spin-wheel/spin-wheel-cc-desktop.png"
            alt="Spin Wheel"
            className="w-64 mx-auto mb-6 drop-shadow-xl"
          />
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-2 text-center">
            Apply for a <span className="text-[#FFD600]">credit card</span> & stand a chance to
          </h2>
          <h3 className="text-[#FFD600] text-3xl md:text-4xl font-extrabold mb-2 text-center">
            WIN up to ₹1 Lakh
          </h3>
          <p className="text-white text-lg text-center mb-4">
            <span className="font-semibold">Assured Gifts</span> on every credit card
          </p>
        </div>
      </div>
      {/* Right Section - Login Card */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white px-6 py-10">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl px-8 py-10">
          <div className="mb-6">
            <h2 className="text-[#4B1FA7] text-xl font-bold mb-1">CARD SAHI, MILEGA YAHIN!</h2>
            <p className="text-[#222] text-base font-medium mb-2">
              Get best Credit Cards for all your needs
            </p>
            <ul className="mb-4 text-[#4B1FA7] text-sm list-disc pl-5">
              <li>Exclusive Co-Branded Cards</li>
              <li>Pre Qualified Card offers (3x Approval Chances)</li>
            </ul>
          </div>
          <form onSubmit={step === 0 ? handleMobileSubmit : handleOtpSubmit}>
            <label className="block text-[#4B1FA7] font-semibold mb-2">
              Mobile Number
            </label>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2 py-1 bg-[#F3F3F7] rounded-lg text-[#4B1FA7] font-bold text-sm">
                +91
              </span>
              <input
                className="flex-1 px-4 py-2 rounded-lg border border-[#E5E5F7] focus:border-[#8B05FF] outline-none text-lg font-medium bg-[#F8F8FF] text-[#222]"
                type="tel"
                maxLength={10}
                value={mobile}
                placeholder="XXXXXXXXXX"
                inputMode="numeric"
                onChange={(e) => setMobile(e.target.value.replace(/\D/, ""))}
                disabled={step === 1}
                autoFocus={step === 0}
              />
              <span className="text-xs text-[#888]">{mobile.length}/10 Digits</span>
            </div>
            {step === 0 && (
              <p className="text-xs text-[#888] mb-2">
                We will check Personalized Offers against your number
              </p>
            )}
            {step === 1 && (
              <>
                <label className="block text-[#4B1FA7] font-semibold mb-2 mt-4">
                  Enter OTP
                </label>
                <input
                  className="w-full px-4 py-2 rounded-lg border border-[#E5E5F7] focus:border-[#8B05FF] outline-none text-lg font-medium bg-[#F8F8FF] text-[#222] mb-2"
                  type="tel"
                  maxLength={4}
                  value={otp}
                  placeholder="Enter OTP (1111)"
                  inputMode="numeric"
                  onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
                  autoFocus
                />
              </>
            )}
            {mobileError && (
              <div className="text-[#ff3b4a] text-sm text-center mb-2">{mobileError}</div>
            )}
            {otpError && (
              <div className="text-[#ff3b4a] text-sm text-center mb-2">{otpError}</div>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#8B05FF] hover:bg-[#4B1FA7] text-white font-bold text-lg mt-2 transition"
            >
              {step === 0 ? "Proceed" : "Verify and Continue"}
            </button>
            {step === 1 && (
              <button
                type="button"
                className="w-full py-2 rounded-lg bg-[#F3F3F7] text-[#8B05FF] font-semibold text-base mt-2 transition"
                onClick={() => setStep(0)}
              >
                Go Back
              </button>
            )}
          </form>
          <p className="text-xs text-[#888] mt-4 text-center">
            By clicking on proceed, you have read and agree to the <br />
            <a href="#" className="text-[#8B05FF] underline">Credit Report Terms of Use</a>,{" "}
            <a href="#" className="text-[#8B05FF] underline">Terms of Use</a> and{" "}
            <a href="#" className="text-[#8B05FF] underline">Privacy Policy</a>
          </p>
          {/* Stepper Dots */}
          <div className="flex justify-center gap-3 mt-6">
            {[0, 1].map((i) => (
              <span
                key={i}
                className={`h-3 w-3 rounded-full border-2 ${
                  step === i ? "bg-[#8B05FF] border-[#8B05FF]" : "bg-[#E5E5F7] border-[#8B05FF]"
                }`}
              ></span>
            ))}
          </div>
          {/* Extra Cards Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#F8F8FF] rounded-xl p-4 flex items-center gap-3 shadow">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2920/2920257.png"
                alt="Calculator"
                className="w-8 h-8"
              />
              <div>
                <div className="font-semibold text-[#4B1FA7] text-sm">Credit Card Reward Calculator</div>
                <a href="#" className="text-[#8B05FF] text-xs underline">Calculate Now →</a>
              </div>
            </div>
            <div className="bg-[#F8F8FF] rounded-xl p-4 flex items-center gap-3 shadow">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2921/2921826.png"
                alt="Redeem"
                className="w-8 h-8"
              />
              <div>
                <div className="font-semibold text-[#4B1FA7] text-sm">Redeem Credit Card Reward Points</div>
                <a href="#" className="text-[#8B05FF] text-xs underline">Check Now →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileLogin;