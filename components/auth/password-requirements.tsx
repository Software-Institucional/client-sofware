"use client";

import { motion, AnimatePresence } from "framer-motion";

interface PasswordRequirement {
  id: string;
  label: string;
  test: (password: string) => boolean;
  delay: number;
}

interface PasswordRequirementsProps {
  password: string;
}

const requirements: PasswordRequirement[] = [
  {
    id: "length",
    label: "Al menos 8 caracteres",
    test: (password) => password.length >= 8,
    delay: 0.1,
  },
  {
    id: "uppercase",
    label: "Una letra mayúscula",
    test: (password) => /[A-Z]/.test(password),
    delay: 0.2,
  },
  {
    id: "lowercase",
    label: "Una letra minúscula",
    test: (password) => /[a-z]/.test(password),
    delay: 0.3,
  },
  {
    id: "number",
    label: "Un número",
    test: (password) => /[0-9]/.test(password),
    delay: 0.4,
  },
  {
    id: "special",
    label: "Un carácter especial",
    test: (password) => /[^a-zA-Z0-9]/.test(password),
    delay: 0.5,
  },
];

function RequirementItem({
  requirement,
  password,
  delay,
}: {
  requirement: PasswordRequirement;
  password: string;
  delay: number;
}) {
  const isValid = requirement.test(password);

  return (
    <motion.li
      className="flex items-center gap-2"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <motion.div
        className={`w-2 h-2 rounded-full ${
          isValid ? "bg-green-500" : "bg-gray-300"
        }`}
        animate={{
          scale: isValid ? [1, 1.3, 1] : 1,
          backgroundColor: isValid ? "#10b981" : undefined,
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.span
        animate={{
          color: isValid ? "#059669" : "#737373",
        }}
        transition={{ duration: 0.3 }}
      >
        {requirement.label}
      </motion.span>
      <AnimatePresence>
        {isValid && (
          <motion.svg
            className="w-3 h-3 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  return (
    <motion.div
      className="bg-blue-50 dark:bg-blue-600/20 p-4 rounded-lg"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-sm font-medium text-blue-800 dark:text-blue-400 mb-2">
        Requisitos de la contraseña:
      </p>
      <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-2">
        {requirements.map((requirement) => (
          <RequirementItem
            key={requirement.id}
            requirement={requirement}
            password={password}
            delay={requirement.delay}
          />
        ))}
      </ul>
    </motion.div>
  );
}
