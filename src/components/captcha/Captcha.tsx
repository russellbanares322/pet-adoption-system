import ReCAPTCHA from "react-google-recaptcha";

type CaptchaProps = {
  onCheckCaptcha: () => void;
  onExpired: () => void;
};
const Captcha = ({ onCheckCaptcha, onExpired }: CaptchaProps) => {
  const { VITE_APP_RECAPTCHA_SITE_KEY } = import.meta.env;

  return (
    <div className="w-full flex items-center justify-center mb-2">
      <ReCAPTCHA
        style={{ width: "max-content" }}
        sitekey={VITE_APP_RECAPTCHA_SITE_KEY}
        onChange={onCheckCaptcha}
        onExpired={onExpired}
        size="normal"
      />
    </div>
  );
};

export default Captcha;
