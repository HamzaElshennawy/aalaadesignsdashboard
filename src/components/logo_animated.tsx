"use client";

import { motion } from "framer-motion";

export default function Component() {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0, fill: "rgba(0, 0, 0, 0)" },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay: i * 0.05,
          type: "spring",
          duration: 1.5,
          bounce: 0,
        },
        opacity: { delay: i * 0.05, duration: 0.01 },
      },
    }),
    colored: (i: number) => ({
      fill: "rgba(179, 34, 80, 100)",
      transition: { delay: i * 0.05 + 2, duration: 1.5 }, // Start coloring after drawing is complete
    }),
  };

  return (
    <div className="w-full h-[50vh] mt-48 flex items-center justify-center">
      <motion.svg
        animate={["visible", "colored"]}
        className="w-full max-w-3xl"
        height="1334"
        initial="hidden"
        viewBox="0 0 1103 1334"
        width="1103"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          custom={0}
          d="m0 0 10 3 107 43 41 16 52 21 15 15 7 8 9 10v96l-9 10-9 11-22 26-9 11-12 14-9 11-22 26-9 11-12 14-9 11-22 26-9 11-12 14-9 11-22 26-9 11-12 14-9 11-11 13-2 3h-2l-9-11-12-14-9-11-12-14-9-11-12-14-9-11-22-26-9-11-12-14-9-11-22-26-9-11-12-14-9-11-22-26-9-11-12-14-9-11-11-13v-96l11-12 14-15 4-5 29-12 161-64zm0 79-40 15-52 20-50 19-12 5v50l13 15 9 10 9 11 12 13 9 11 11 12 9 11 12 13 9 11 11 12 9 11 12 13 9 11 11 12 9 11 3-1 9-11 12-13 9-11 11-12 9-11 12-13 9-11 11-12 9-11 12-13 9-11 11-12 9-11 12-13 9-11v-50l-20-8-50-19-84-32zm0 363v10h2v-10z"
          fill="#B21553"
          stroke="#B21553"
          strokeWidth="2"
          transform="translate(545,1)"
          variants={pathVariants}
        />
        <motion.path
          custom={1}
          d="m0 0h6l22 14 14 9 15 24 24 38 15 24 12 19 15 24 24 38 10 16v2l5-1v8h-2l-1 9-41 205-15 20-11 15-25 5-65 12h-6l-22-12-24-14-27-15-49-28-25-14-24-14-27-15-49-28-25-14-21-12-19-11h-10l2-4-2-3 7-3 11-13 18-22 11-13 8-10 11-13 11-14 13-15 11-14 13-15 11-14 13-15 8-10 11-13 11-14 13-15 11-14 13-15 8-10 11-13 11-14 4-2zm-5 87-43 8-5 3-11 14-13 16-10 13-13 16-13 17-14 17-22 28-13 16-22 28-9 11 1 3 128 76 28 17 21 12 20 12 29-5 20-4 5-24 24-130-1-7-16-26-12-20-14-23-31-51-10-16z"
          fill="#C21848"
          stroke="#C21848"
          strokeWidth="2"
          transform="translate(933,256)"
          variants={pathVariants}
        />
        <motion.path
          custom={2}
          d="m0 0 11 1 77 15 5 3 9 11 13 15 36 42 9 11 9 10 9 11 9 10 9 11 13 15 36 42 9 11 9 10 9 11 9 10 9 11 13 15 24 28 1 3 6 1-3 3-28 16-25 14-49 28-25 14-49 28-25 14-24 14-27 15-49 28-18 10-12-1-81-15-3-1-14-19-10-13-2-3-41-205v-16h2l2-5 13-21 24-38 15-24 12-19 15-24 24-38 9-14 2-4 18-11zm10 87-6 9-51 84-28 46 1 11 27 145 1 3 36 7 13 2 29-17 28-17 21-12 25-15 64-38 30-18v-4l-14-17-10-13-13-16-22-28-13-16-13-17-14-17-22-28-13-16-7-9-25-5-21-4z"
          fill="#BF1414"
          stroke="#BF1414"
          strokeWidth="2"
          transform="translate(151,256)"
          variants={pathVariants}
        />
        <motion.path
          custom={3}
          d="m0 0h6l22 14 14 9 15 24 24 38 15 24 12 19 15 24 24 38 10 16v2l5-1v8h-2l-1 4v-3l-42 7h-7l-16-25-30-46-10-15h-23l-2 2-13-22-13-21-5-8-13 2-33 6-4 2-11 14-13 16-10 13-13 16-13 17-14 17-22 28-5 5-2-1h-57l-10 11-9 11-12 14-9 11-12 14-7 9-12 3-31 6-12 2 2-4-2-3 7-3 11-13 18-22 11-13 8-10 11-13 11-14 13-15 11-14 13-15 11-14 13-15 8-10 11-13 11-14 13-15 11-14 13-15 8-10 11-13 11-14 4-2z"
          fill="#F45783"
          stroke="#F45783"
          strokeWidth="2"
          transform="translate(933,256)"
          variants={pathVariants}
        />
        <motion.path
          custom={4}
          d="m0 0 11 1 77 15 5 3 9 11 13 15 36 42 9 11 9 10 9 11 9 10 9 11 13 15 36 42 9 11 9 10 9 11 9 10 9 11 13 15 24 28 1 3h2v2h-10l-39-4-5-5-13-15-9-11-12-14-9-11-13-15-9-11-18-21h-59l-11-13-10-13-13-16-22-28-13-16-6-8-25-5-21-4-4 1-10 17-14 23-16 26h-27l-13 20-10 15-56 1-2 1 2-5 15-24 12-19 15-24 12-19 15-24 24-38 9-14 2-4 18-11z"
          fill="#E74D23"
          stroke="#E74D23"
          strokeWidth="2"
          transform="translate(151,256)"
          variants={pathVariants}
        />
        <motion.path
          custom={5}
          d="m0 0 10 3 107 43 41 16 52 21 3 2v101l-9 11-11 13-9 11-11 13-11 14-6 7-7 9-2 2h-57l-5 4 2-4 11-12 9-11 11-12 9-11 12-13 9-11 7-8 1-50-10-3-44-17-50-19-47-18-4-2v-18l-22 1-28 11-49 20-42 17-12 5h-2v14h-54l-2-1-2-38-10 10v-3l14-14 80-32 108-43z"
          fill="#E34694"
          stroke="#E34694"
          strokeWidth="2"
          transform="translate(545,1)"
          variants={pathVariants}
        />
        <motion.path
          custom={6}
          d="m0 0h16l16 41 21 53 30 76 16 40 18-44 66-165 1-1h15l4 8 14 36 19 48 17 43 30 76 2 5v-216h13v209l123-1 36-90 20-49 27-68 1-1h15l4 8 14 36 21 53 30 76 14 35 1 2 36-90 20-49 28-70 1-1h15l5 11 14 36 19 48 32 81 15 38 2 7h-15l-15-39-12-30v-2l-106 1-28 70h-22l-5-11-18-46-5-13h-106l-20 51-8 19h-159l-5-11-18-46-5-13h-106l-22 56-6 14h-22l-5-12-19-48-4-10-106-1-3 9-20 51-5 11h-14l1-5 20-50 66-164zm8 13-4 8-15 39-22 55-8 21v2h97l-11-30-16-42-20-53zm183 0-14 36-22 56-12 30v3h96l-1-5-16-43-16-42-13-34zm321 0-14 36-22 56-12 30v3h96l-1-5-13-35-19-50-13-34zm184 0-15 38-22 56-12 30v1h97l-3-10-15-40-22-58-6-16z"
          fill="#FDFDFD"
          stroke="#FDFDFD"
          strokeWidth="2"
          transform="translate(192,875)"
          variants={pathVariants}
        />
        <motion.path
          custom={7}
          d="m0 0 7 6 15 16 6 7v96l-9 10-9 11-22 26-9 11-12 14-9 11-22 26-9 11-12 14-9 11-22 26-9 11-12 14-9 11-22 26-9 11-12 14-9 11-11 13-2 3-2-1v-44h2v-10l-2-1 1-76 12-14 10-11 9-11 11-12 9-11 12-13 9-11 10-11 8-6h56l7-8 6-8 11-13 9-11 11-13 18-22 3-4z"
          fill="#A81E5B"
          stroke="#A81E5B"
          strokeWidth="2"
          transform="translate(758,88)"
          variants={pathVariants}
        />
        <motion.path
          custom={8}
          d="m0 0h6l24 13 21 12 54 30 23 13 27 15 25 14 23 13 29 16 52 29 11-1 81-15h6l-2 5-16 21-4 6-25 5-65 12h-6l-22-12-24-14-27-15-49-28-25-14-24-14-27-15-49-28-25-14-21-12-19-11-1-2 24-5 15-3z"
          fill="#8C1338"
          stroke="#8C1338"
          strokeWidth="2"
          transform="translate(665,549)"
          variants={pathVariants}
        />
        <motion.path
          custom={9}
          d="m0 0h4v60l-22 1-28 11-49 20-42 17-12 5h-2v14h-54l-2-1-2-38-10 10v-3l14-14 80-32 108-43z"
          fill="#CB2D6F"
          stroke="#CB2D6F"
          strokeWidth="2"
          transform="translate(542,2)"
          variants={pathVariants}
        />
        <motion.path
          custom={10}
          d="m0 0 3 1 9 11 11 13 9 11 11 13 8 10 11 13 11 14 13 15 9 11 11 13 9 11 16 20 11 13 9 11 11 13 8 10 1 1 1 56-7-6-9-11-11-13-9-11-12-14-9-11-12-14-9-11-12-14-9-11-22-26-9-11-12-14-9-11-22-26-9-11-12-14-9-11-11-13-2-5 2-1z"
          fill="#961549"
          stroke="#961549"
          strokeWidth="2"
          transform="translate(374,237)"
          variants={pathVariants}
        />
        <motion.path
          custom={11}
          d="m0 0h6l33 21-4 2-92 17-3 1-9 11-12 14-11 13-9 11-12 14-9 11-12 14-13 16-12 14-22 26-3 4-46 1-5 4 2-4 11-13 9-11 14-17 11-13 8-10 11-13 11-14 13-15 11-14 13-15 8-10 11-13 11-14 4-2z"
          fill="#EE7094"
          stroke="#EE7094"
          strokeWidth="2"
          transform="translate(933,256)"
          variants={pathVariants}
        />
        <motion.path
          custom={12}
          d="m0 0 54 1v4l-13 16-13 17-14 17-22 28-5 5-2-1h-57l-10 11-9 11-12 14-9 11-12  14-7 9-12 3-31 6-12 2 2-4-2-3 7-3 11-13 18-22 11-13 8-10 11-13 11-14 12-14 7-6 46-1 9-11 13-15 9-11z"
          fill="#DE446F"
          stroke="#DE446F"
          strokeWidth="2"
          transform="translate(793,392)"
          variants={pathVariants}
        />
        <motion.path
          custom={13}
          d="m0 0 67 1 2 1v2l-28 16-25 14-24 14-27 15-49 28-18 10-12-1-81-15-3-1-14-19-8-11v-2l11 1 82 15 7-1 29-16 23-13 52-29z"
          fill="#680505"
          stroke="#680505"
          strokeWidth="2"
          transform="translate(265,636)"
          variants={pathVariants}
        />
        <motion.path
          custom={14}
          d="m0 0 56 1-2 4-12 14-11 14-13 15-9 11-11 13-8 10-11 13-9 11-11 13-11 14-13 15-9 11-13 16-1 2-2-1 1-76 12-14  10-11 9-11 11-12 9-11 12-13 9-11 10-11z"
          fill="#BE2470"
          stroke="#BE2470"
          strokeWidth="2"
          transform="translate(635,266)"
          variants={pathVariants}
        />
        <motion.path
          custom={15}
          d="m0 0 11 1 77 15 5 3 9 11 13 15 36 42 9 11 9 10 9 11 9 10 9 11 2 4-43 1-9-11-12-14-11-13-9-11-12-14-11-13-9-11-12-14-2-3-25-5-76-14 5-4 19-12z"
          fill="#EF6F55"
          stroke="#EF6F55"
          strokeWidth="2"
          transform="translate(151,256)"
          variants={pathVariants}
        />
        <motion.path
          custom={16}
          d="m0 0h43l11 12 9 11 9 10 9 11 13 15 36 42 11 13 24 28 7 8v2h2v2h-10l-39-4-5-5-13-15-9-11-12-14-9-11-13-15-9-11-12-14-13-16-11-13-9-11-10-12z"
          fill="#C64A3F"
          stroke="#C64A3F"
          strokeWidth="2"
          transform="translate(307,400)"
          variants={pathVariants}
        />
        <motion.path
          custom={17}
          d="m0 0 6 1 61 34 11-1 81-15h6l-2 5-16 21-4 6-25 5-65 12h-6l-22-12-24-14-27-15-21-12-19-11v-2l2-1z"
          fill="#7D0529"
          stroke="#7D0529"
          strokeWidth="2"
          transform="translate(882,669)"
          variants={pathVariants}
        />
        <motion.path
          custom={18}
          d="m0 0 30 2 20 2h14l-3 3-28 16-25 14-49 28-25 14-19 11-4-1-62-1-3-2 129-72z"
          fill="#882425"
          stroke="#882425"
          strokeWidth="2"
          transform="translate(421,549)"
          variants={pathVariants}
        />
        <motion.path
          custom={19}
          d="m0 0h56l11 12 9 11 12 14 9 11 13 15 9 11 12 14 9 11 2 4 2 1-12-1-36-7-27-5-9-10-22-28-13-16-22-28-5-6v-2z"
          fill="#D23510"
          stroke="#D23510"
          strokeWidth="2"
          transform="translate(288,446)"
          variants={pathVariants}
        />
        <motion.path
          custom={20}
          d="m0 0 7 6 15 16 6 7v96l-9 10-9 11-11 13-10 12-3-1-44-1 4-6 12-14 9-11 11-13 18-22 3-4z"
          fill="#BF2670"
          stroke="#BF2670"
          strokeWidth="2"
          transform="translate(758,88)"
          variants={pathVariants}
        />
        <motion.path
          custom={21}
          d="m0 0h43l9 10 10 13 11 13 9 11 11 13 11 14 3 3 1 56-7-6-9-11-11-13-9-11-12-14-9-11-12-14-9-11-12-14-9-11-11-13v-3z"
          fill="#820738"
          stroke="#820738"
          strokeWidth="2"
          transform="translate(438,364)"
          variants={pathVariants}
        />
        <motion.path
          custom={22}
          d="m0 0h3l12 19 15 24 12 19 5 8v2l5-1v8h-2l-1 4v-3l-42 7h-7l-16-25-30-46-9-14v-1z"
          fill="#DE446F"
          stroke="#DE446F"
          strokeWidth="2"
          transform="translate(1043,392)"
          variants={pathVariants}
        />
        <motion.path
          custom={23}
          d="m0 0h1l1 97 9 11 11 13 11 14 9 11-1 2-42 1-3 1-13-15-9-11-1-1v-96l11-12 10-9z"
          fill="#AA205C"
          stroke="#AA205C"
          strokeWidth="2"
          transform="translate(333,90)"
          variants={pathVariants}
        />
        <motion.path
          custom={24}
          d="m0 0h54l-6 8-11 13-9 11-11 13-11 14-6 7-7 9-2 2h-57l-5 4 2-4 11-12 9-11 11-12 9-11 12-13 9-11z"
          fill="#D23583"
          stroke="#D23583"
          strokeWidth="2"
          transform="translate(701,190)"
          variants={pathVariants}
        />
        <motion.path
          custom={25}
          d="m0 0h43l2 1-1 4-9 11-12 14-9 11-22 26-9 11-12 14-9 11-11 13-2 3-2-1v-44h2v-12l11-13 9-11 11-13 11-14z"
          fill="#98174B"
          stroke="#98174B"
          strokeWidth="2"
          transform="translate(598,379)"
          variants={pathVariants}
        />
        <motion.path
          custom={26}
          d="m0 0h6l24 13 21 12 54 30 3 2v2l-2 1-60 1-1 2-5-2-25-14-24-14-29-16-11-7 3-2 36-7z"
          fill="#A42A43"
          stroke="#A42A43"
          strokeWidth="2"
          transform="translate(665,549)"
          variants={pathVariants}
        />
        <motion.path
          custom={27}
          d="m0 0h22v18l-12 5-110 42-29 11h-4v-22l31-13 84-34z"
          fill="#A91F5B"
          stroke="#A91F5B"
          strokeWidth="2"
          transform="translate(524,62)"
          variants={pathVariants}
        />
        <motion.path
          custom={28}
          d="m0 0h24l2 1-2 5-12 20-14 23-16 26-37-6-38-7v-8h2l2-5 7-11 3-2 56-1 16-25z"
          fill="#C42D05"
          stroke="#C42D05"
          strokeWidth="2"
          transform="translate(93,410)"
          variants={pathVariants}
        />
        <motion.path
          custom={29}
          d="m0 0 67 1 2 1v2l-28 16-25 14-24 14-5 3-4-1-63-1-4-2 25-14 27-15 23-13z"
          fill="#751112"
          stroke="#751112"
          strokeWidth="2"
          transform="translate(265,636)"
          variants={pathVariants}
        />
        <motion.path
          custom={30}
          d="m0 0h6l33 21-4 2-65 12-11-1-58-1-2-1 2-4 9-11 25-5z"
          fill="#F77C8F"
          stroke="#F77C8F"
          strokeWidth="2"
          transform="translate(933,256)"
          variants={pathVariants}
        />
        <motion.path
          custom={31}
          d="m0 0 56 1-2 4-12 14-11 14-12 14h-59l-6 5 2-4 11-12 9-11 11-12 6-7z"
          fill="#CB2D6F"
          stroke="#CB2D6F"
          strokeWidth="2"
          transform="translate(635,266)"
          variants={pathVariants}
        />
        <motion.path
          custom={32}
          d="m0 0h58l13 15 9 11 18 21v2l2 1-12-1-36-7-27-5-9-10-11-14-8-10v-2z"
          fill="#C42C04"
          stroke="#C42C04"
          strokeWidth="2"
          transform="translate(332,500)"
          variants={pathVariants}
        />
        <motion.path
          custom={33}
          d="m0 0 6 1 36 15 30 12v22l-7-1-110-42-6-3-1-2 2-1z"
          fill="#BF2570"
          stroke="#BF2570"
          strokeWidth="2"
          transform="translate(629,88)"
          variants={pathVariants}
        />
        <motion.path
          custom={34}
          d="m0 0 6 2 23 13 20 11v1l-67 1-1 2-5-2-25-14-14-8 1-4 60-1z"
          fill="#971749"
          stroke="#971749"
          strokeWidth="2"
          transform="translate(773,607)"
          variants={pathVariants}
        />
        <motion.path
          custom={35}
          d="m0 0h46l10 11 9 11 9 10 6 7v2h2v2h-10l-39-4-5-5-13-15-9-11z"
          fill="#E64D24"
          stroke="#E64D24"
          strokeWidth="2"
          transform="translate(399,511)"
          variants={pathVariants}
        />
        <motion.path
          custom={36}
          d="m0 0 30 2 20 2h14l-3 3-42 24-1-2-61-1-2-1v-2l29-16z"
          fill="#A52A43"
          stroke="#A52A43"
          strokeWidth="2"
          transform="translate(421,549)"
          variants={pathVariants}
        />
        <motion.path
          custom={37}
          d="m0 0h16l12 6 6 7 1-11 1-1h5v79l-3 10-4 6-7 6-10 3h-15l-11-3-8-7-3-6-1-7h6l3 8 4 5 6 3 4 1h14l10-4 6-7 2-6v-22l-7 8-10 5-11 1-11-2-9-6-6-8-4-11v-20l4-11 6-8 8-6zm5 4-9 3-7 5-5 8-3 11v11l3 12 6 8 7 5 7 2h8l9-3 8-7 5-10 1-4v-17l-4-11-7-8-8-4z"
          fill="#FDFDFD"
          stroke="#FDFDFD"
          strokeWidth="2"
          transform="translate(590,1189)"
          variants={pathVariants}
        />
        <motion.path
          custom={38}
          d="m0 0h56l-7 12-10 15-5 7-10-1-38-7v-8h2l2-5 7-11z"
          fill="#D23510"
          stroke="#D23510"
          strokeWidth="2"
          transform="translate(14,446)"
          variants={pathVariants}
        />
        <motion.path
          custom={39}
          d="m0 0 4 2-9 10-9 11-10 12-46 1-5 4 2-4 11-13 9-11 5-6 6-5z"
          fill="#F35783"
          stroke="#F35783"
          strokeWidth="2"
          transform="translate(773,410)"
          variants={pathVariants}
        />
        <motion.path
          custom={40}
          d="m0 0h6v104h-6l-1-13-9 10-8 4-4 1h-14l-10-4-7-6-6-12-2-8v-18l3-11 6-10 8-6 8-3h16l9 4 8 7 2 4zm-30 32-9 2-6 4-6 7-4 11-1 7v8l3 13 6 10 9 6 3 1h14l10-5 6-7 4-10 1-4v-16l-3-10-5-8-7-6-10-3z"
          fill="#FDFDFD"
          stroke="#FDFDFD"
          strokeWidth="2"
          transform="translate(375,1161)"
          variants={pathVariants}
        />
        <motion.path
          custom={41}
          d="m0 0h44l2 1-2 5-13 15-11 13-3-1-43-1 4-6 12-14 9-11z"
          fill="#B21653"
          stroke="#B21653"
          strokeWidth="2"
          transform="translate(700,257)"
          variants={pathVariants}
        />
        <motion.path
          custom={42}
          d="m0 0h4l2 6-11 54-2 5-23-1 1-9 9-49 2-3z"
          fill="#B31654"
          stroke="#B31654"
          strokeWidth="2"
          transform="translate(1035,481)"
          variants={pathVariants}
        />
        <motion.path
          custom={43}
          d="m0 0h17l9 4 8 7 5 9 2 7v13h-60l2 13 5 10 5 5 8 4h15l10-5 6-8 3-8h6l-3 10-6 9-9 6-7 2h-15l-10-4-8-7-5-8-3-12v-14l3-12 4-8 6-7zm6 4-10 3-8 7-6 12-1 9h54l1-3-3-12-6-8-8-6-8-2z"
          fill="#FDFDFD"
          stroke="#FDFDFD"
          strokeWidth="2"
          transform="translate(420,1189)"
          variants={pathVariants}
        />
        <motion.path
          custom={44}
          d="m0 0 53 1 2 2-12 5-44 17-24 9h-4v-22z"
          fill="#98174A"
          stroke="#98174A"
          strokeWidth="2"
          transform="translate(420,104)"
          variants={pathVariants}
        />
        <motion.path
          custom={45}
          d="m0 0h3l10 16 17 26 6 9v2l-23 1-2 2-13-22-13-21-4-7v-2l13-3z"
          fill="#DE456F"
          stroke="#DE456F"
          strokeWidth="2"
          transform="translate(951,339)"
          variants={pathVariants}
        />
        <motion.path
          custom={46}
          d="m0 0h18l8 3 8 7 3 9-1 5-5-1-2-8-3-5-8-4-11-1-10 2-6 4-3 7 2 8 5 4 14 4 19 5 8 6 3 7v10l-4 8-9 6-8 2h-16l-11-4-6-5-5-10-1-7 1-1h5l3 10 3 5 8 5 4 1h15l9-3 5-6v-11l-4-5-10-4-21-5-8-4-6-7-1-3v-10l3-6 6-5z"
          fill="#FDFDFD"
          stroke="#FDFDFD"
          strokeWidth="2"
          transform="translate(492,1189)"
          variants={pathVariants}
        />
        <motion.path
          custom={47}
          d="m0 0h19l10 4 7 8 2 11-5 1-3-9-2-5-4-2-5-2-11-1-10 2-6 4-3 6 1 7 4 5 11 4 21 5 6 3 5 5 3 7v9l-3 6-8 7-10 3h-16l-11-4-7-6-4-8-1-8 5-1 5 12 5 5 8 4h16l10-4 4-5v-11l-4-5-10-4-24-6-8-5-4-7v-11l3-6 6-5z"
          fill="#FDFDFD"
          stroke="#FDFDFD"
          strokeWidth="2"
          transform="translate(740,1189)"
          variants={pathVariants}
        />
        <motion.path
          custom={48}
          d="m0 0h17l10 5 4 5 3 7 1 6v53h-6l-1-56-4-9-5-4-8-2-11 1-8 4-6 7-4 11-1 48h-6v-74l1-1h5l1 13 7-8 8-5z"
          fill="#FDFDFD"
          stroke="#FDFDFD"
          strokeWidth="2"
          transform="translate(672,1189)"
          variants={pathVariants}
        />
        <motion.path
          custom={49}
          d="m0 0h1l1 16 2 3h58l2 2-7 2v14h-54l-2-1-1-18z"
          fill="#BF256F"
          stroke="#BF256F"
          strokeWidth="2"
          transform="translate(334,93)"
          variants={pathVariants}
        />
        <motion.path
          custom={50}
          d="m0 0h7l37 15-1 2-50 1-1 2-10-3-21-8-1-1v-7z"
          fill="#D23683"
          stroke="#D23683"
          strokeWidth="2"
          transform="translate(586,72)"
          variants={pathVariants}
        />
        <motion.path
          custom={51}
          d="m0 0h22v18l-12 5-7-1-50-1-1-2 30-12z"
          fill="#B21553"
          stroke="#B21553"
          strokeWidth="2"
          transform="translate(524,62)"
          variants={pathVariants}
        />
        <motion.path
          custom={52}
          d="m0 0h43l9 10 7 9-2 1-4-1h-38l-3 1-9-10-5-6v-3z"
          fill="#8C1338"
          stroke="#8C1338"
          strokeWidth="2"
          transform="translate(438,364)"
          variants={pathVariants}
        />
        <motion.path
          custom={53}
          d="m0 0h21l5 27v7l-11-1-10-2-3-12-3-14z"
          fill="#892525"
          stroke="#892525"
          strokeWidth="2"
          transform="translate(78,606)"
          variants={pathVariants}
        />
        <motion.path
          custom={54}
          d="m0 0 23 1-3 16-2 7-1 4h-22l1-11 3-16z"
          fill="#B31754"
          stroke="#B31754"
          strokeWidth="2"
          transform="translate(1e3 546)"
          variants={pathVariants}
        />
        <motion.path
          custom={55}
          d="m0 0 6 1 46 1 2 2-12 5-9 3-2-1-43-1-8-1 3-2z"
          fill="#B21654"
          stroke="#B21654"
          strokeWidth="2"
          transform="translate(442,95)"
          variants={pathVariants}
        />
        <motion.path
          custom={56}
          d="m0 0h37l3 2v16l-7-1-37-14-1-2z"
          fill="#B41855"
          stroke="#B41855"
          strokeWidth="2"
          transform="translate(661,120)"
          variants={pathVariants}
        />
        <motion.path
          custom={57}
          d="m0 0 6 1 12 5-1 2-50 1-1 2-16-6-2-3 2-1z"
          fill="#CB2E70"
          stroke="#CB2E70"
          strokeWidth="2"
          transform="translate(629,88)"
          variants={pathVariants}
        />
        <motion.path
          custom={58}
          d="m0 0h24l2 1-2 5-7 12-4-1h-22l-1-2z"
          fill="#D23511"
          stroke="#D23511"
          strokeWidth="2"
          transform="translate(93,410)"
          variants={pathVariants}
        />
        <motion.path
          custom={59}
          d="m0 0h5v75h-5z"
          fill="#FDFDFD"
          stroke="#FDFDFD"
          strokeWidth="2"
          transform="translate(546,1190)"
          variants={pathVariants}
        />
        <motion.path
          custom={60}
          d="m0 0 58 1-5 7-59-1z"
          fill="#BE246F"
          stroke="#BE246F"
          strokeWidth="2"
          transform="translate(602,304)"
          variants={pathVariants}
        />
        <motion.path
          custom={61}
          d="m0 0 7 6 15 16 2 3-3 1h-21z"
          fill="#CD3172"
          stroke="#CD3172"
          strokeWidth="2"
          transform="translate(758,88)"
          variants={pathVariants}
        />
        <motion.path
          custom={62}
          d="m0 0h20l1 5-2 7-16 3h-5l1-13z"
          fill="#882525"
          stroke="#882525"
          strokeWidth="2"
          transform="translate(990,625)"
          variants={pathVariants}
        />
        <motion.path
          custom={63}
          d="m0 0 6 2 4 3-67 1-1 2-5-2-3-3 3-1 62-1z"
          fill="#961549"
          stroke="#961549"
          strokeWidth="2"
          transform="translate(812,629)"
          variants={pathVariants}
        />
        <motion.path
          custom={64}
          d="m0 0h21l1 2-1 7-1 1h-22l1-9z"
          fill="#A62845"
          stroke="#A62845"
          strokeWidth="2"
          transform="translate(1e3 564)"
          variants={pathVariants}
        />
        <motion.path
          custom={65}
          d="m0 0 58 1-3 4-58-1z"
          fill="#BE2470"
          stroke="#BE2470"
          strokeWidth="2"
          transform="translate(606,299)"
          variants={pathVariants}
        />
        <motion.path
          custom={66}
          d="m0 0 43 1v2l-2 1-41 1-3-4z"
          fill="#E64C23"
          stroke="#E64C23"
          strokeWidth="2"
          transform="translate(397,504)"
          variants={pathVariants}
        />
        <motion.path
          custom={67}
          d="m0 0h57l2 2-6 2v-2h-54z"
          fill="#BE2470"
          stroke="#BE2470"
          strokeWidth="2"
          transform="translate(339,112)"
          variants={pathVariants}
        />
        <motion.path
          custom={68}
          d="m0 0 7 1v1l-67 1-1 2-5-2 3-2z"
          fill="#A52C45"
          stroke="#A52C45"
          strokeWidth="2"
          transform="translate(815,632)"
          variants={pathVariants}
        />
        <motion.path
          custom={69}
          d="m0 0h5v15h-5z"
          fill="#FDFDFD"
          stroke="#FDFDFD"
          strokeWidth="2"
          transform="translate(546,1161)"
          variants={pathVariants}
        />
        <motion.path
          custom={70}
          d="m0 0 9 1v3h-20l2-2z"
          fill="#BE2470"
          stroke="#BE2470"
          strokeWidth="2"
          transform="translate(537,58)"
          variants={pathVariants}
        />
        <motion.path
          custom={71}
          d="m0 0 7 1v5l-9-2-2-1v-2z"
          fill="#AF2863"
          stroke="#AF2863"
          strokeWidth="2"
          transform="translate(693,132)"
          variants={pathVariants}
        />
        <motion.path
          custom={72}
          d="m0 0h1v12l-6-5v-3l5-1z"
          fill="#90113D"
          stroke="#90113D"
          strokeWidth="2"
          transform="translate(545,485)"
          variants={pathVariants}
        />
      </motion.svg>
    </div>
  );
}
