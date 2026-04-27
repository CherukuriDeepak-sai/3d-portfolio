import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

import { certifications } from "../../constants";
import { SectionWrapper } from "../../hoc";
import { fadeIn } from "../../utils/motion";
import { Header } from "../atoms/Header";
import { config } from "../../constants/config";
import { TCertificate } from "../../types";

const CertificateCard: React.FC<{ index: number } & TCertificate> = ({
  index,
  title,
  provider,
  credentialType,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.25, 0.6)}>
      <Tilt glareEnable tiltEnable tiltMaxAngleX={20} tiltMaxAngleY={20} glareColor="#a8b9ff">
        <div className="bg-tertiary min-h-[170px] w-[260px] rounded-2xl border border-white/10 p-4 sm:w-[280px]">
          <div className="mb-3 inline-flex rounded-full border border-[#4A8DFF]/60 bg-[#4A8DFF]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#9CC2FF]">
            Certificate
          </div>

          <h3 className="text-[18px] font-bold text-white">{title}</h3>
          <p className="text-secondary mt-2 text-[14px]">{provider}</p>
          {credentialType ? (
            <p className="mt-3 text-[12px] font-medium text-[#FACC15]">
              {credentialType}
            </p>
          ) : null}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Certifications = () => {
  return (
    <>
      <Header useMotion={true} {...config.sections.certifications} />

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="text-secondary mt-3 max-w-3xl text-[17px] leading-[30px]"
      >
        {config.sections.certifications.content}
      </motion.p>

      <div className="mt-10 flex flex-wrap gap-6 max-sm:justify-center">
        {certifications.map((certificate, index) => (
          <CertificateCard key={`${certificate.title}-${index}`} index={index} {...certificate} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Certifications, "certifications");
