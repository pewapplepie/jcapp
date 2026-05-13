import { useMemo } from "react";
import { useAdmin } from "../context/AdminContext";
import { useTheme } from "../context/ThemeContext";

const formatInlineText = (text, isDarkMode) => {
  const boldRegex = /\*\*([^*]+)\*\*/g;
  const italicRegex = /\*([^*]+)\*/g;
  const boldMatches = [];
  let boldMatch;

  // eslint-disable-next-line no-cond-assign
  while ((boldMatch = boldRegex.exec(text)) !== null) {
    boldMatches.push({
      index: boldMatch.index,
      length: boldMatch[0].length,
      text: boldMatch[1],
      type: "bold",
    });
  }

  italicRegex.lastIndex = 0;
  const italicMatches = [];
  let italicMatch;

  // eslint-disable-next-line no-cond-assign
  while ((italicMatch = italicRegex.exec(text)) !== null) {
    const currentMatch = {
      index: italicMatch.index,
      length: italicMatch[0].length,
      text: italicMatch[1],
      type: "italic",
    };
    const overlapsBold = boldMatches.some(
      (matchItem) =>
        currentMatch.index >= matchItem.index &&
        currentMatch.index < matchItem.index + matchItem.length
    );

    if (!overlapsBold) {
      italicMatches.push(currentMatch);
    }
  }

  const matches = [...boldMatches, ...italicMatches].sort(
    (left, right) => left.index - right.index
  );
  const nodes = [];
  let currentIndex = 0;

  matches.forEach((matchItem, index) => {
    if (matchItem.index > currentIndex) {
      nodes.push(text.substring(currentIndex, matchItem.index));
    }

    if (matchItem.type === "bold") {
      nodes.push(
        <strong
          key={`bold-${index}`}
          className={isDarkMode ? "text-white" : "text-slate-900"}
        >
          {matchItem.text}
        </strong>
      );
    } else {
      nodes.push(
        <em
          key={`italic-${index}`}
          className={isDarkMode ? "text-stone-200" : "text-slate-700"}
        >
          {matchItem.text}
        </em>
      );
    }

    currentIndex = matchItem.index + matchItem.length;
  });

  if (currentIndex < text.length) {
    nodes.push(text.substring(currentIndex));
  }

  return nodes.length > 0 ? nodes : text;
};

const getHeadingLevel = (line) => {
  const trimmedLine = line.trim();

  if (trimmedLine.startsWith("### ")) {
    return 3;
  }

  if (trimmedLine.startsWith("## ")) {
    return 2;
  }

  if (trimmedLine.startsWith("# ")) {
    return 1;
  }

  return null;
};

const getHeadingClasses = (level, isDarkMode) => {
  const colorClass = isDarkMode ? "text-stone-100" : "text-slate-900";
  const baseClass = `m-0 text-base leading-8 md:text-[1.05rem] ${colorClass}`;

  if (level === 1) {
    return `${baseClass} font-newsreader font-medium tracking-[0.02em]`;
  }

  if (level === 2) {
    return `${baseClass} font-semibold uppercase tracking-[0.18em]`;
  }

  return `${baseClass} font-semibold`;
};

const renderHeadingText = (text, isDarkMode, fallbackClassName) => {
  const headingLevel = getHeadingLevel(text);

  if (headingLevel) {
    const headingText = text.trim().replace(/^#{1,3}\s/, "");
    return (
      <div className={getHeadingClasses(headingLevel, isDarkMode)}>
        {formatInlineText(headingText, isDarkMode)}
      </div>
    );
  }

  return <div className={fallbackClassName}>{formatInlineText(text, isDarkMode)}</div>;
};

const renderDetailLine = (line, isDarkMode, keyPrefix) => {
  const headingLevel = getHeadingLevel(line);

  if (headingLevel) {
    return <div key={keyPrefix}>{renderHeadingText(line, isDarkMode)}</div>;
  }

  const indentation = (line.match(/^\t+/) || [""])[0].length;
  const isBullet = line.trim().startsWith("•");
  const cleanLine = line.replace(/^\t+/, "").replace(/^•\s?/, "");

  return (
    <div
      key={keyPrefix}
      className={`flex gap-4 ${isBullet ? "items-start" : "items-baseline"}`}
      style={{ paddingLeft: `${indentation * 1.5}rem` }}
    >
      <span
        className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${
          isBullet
            ? isDarkMode
              ? "bg-stone-300"
              : "bg-slate-400"
            : "bg-transparent"
        }`}
      />
      <div
        className={`text-base leading-8 md:text-[1.05rem] ${
          isDarkMode ? "text-stone-300" : "text-slate-700"
        }`}
      >
        {formatInlineText(cleanLine, isDarkMode)}
      </div>
    </div>
  );
};

const ResumeSection = ({ title, content, isDarkMode }) => {
  const entries = useMemo(
    () =>
      content
        .split(/\n\s*\n/)
        .map((entry) => entry.split("\n").map((line) => line.trimEnd()))
        .map((lines) => lines.filter((line) => line.trim().length > 0))
        .filter((lines) => lines.length > 0)
        .map(([heading, ...details]) => ({ heading, details })),
    [content]
  );

  return (
    <section className="space-y-8">
      <div className="border-b border-current/10 pb-4">
        {renderHeadingText(
          title,
          isDarkMode,
          `m-0 text-base font-medium leading-8 md:text-[1.05rem] ${
            isDarkMode ? "text-stone-100" : "text-slate-900"
          }`
        )}
      </div>
      <div className="space-y-10">
        {entries.map((entry, index) => (
          <article key={`${title}-${index}`} className="space-y-3">
            {renderHeadingText(
              entry.heading,
              isDarkMode,
              `m-0 text-base font-semibold leading-8 md:text-[1.05rem] ${
                isDarkMode ? "text-stone-100" : "text-slate-900"
              }`
            )}
            {entry.details.length > 0 && (
              <div className="space-y-2">
                {entry.details.map((line, detailIndex) =>
                  renderDetailLine(
                    line,
                    isDarkMode,
                    `${title}-${index}-${detailIndex}`
                  )
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

const About = () => {
  const { cvContent, getInTouchContent } = useAdmin();
  const { isDarkMode } = useTheme();

  const pageClasses = isDarkMode
    ? "bg-black text-stone-100"
    : "bg-white text-slate-900";
  const bodyTextClasses = isDarkMode ? "text-stone-300" : "text-slate-700";

  return (
    <div className={pageClasses}>
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-14 px-6 py-12 md:px-8 md:py-20">
        <section className="space-y-6">
          {renderHeadingText(
            getInTouchContent.title,
            isDarkMode,
            `m-0 text-base font-medium leading-8 md:text-[1.05rem] ${
              isDarkMode ? "text-stone-100" : "text-slate-900"
            }`
          )}
          <div className={`max-w-3xl whitespace-pre-wrap text-lg leading-8 ${bodyTextClasses}`}>
            {getInTouchContent.content}
          </div>
        </section>

        <section className="space-y-12">
          {cvContent?.workExperience && (
            <ResumeSection
              title={cvContent.workExperience.title}
              content={cvContent.workExperience.content}
              isDarkMode={isDarkMode}
            />
          )}
          {cvContent?.education && (
            <ResumeSection
              title={cvContent.education.title}
              content={cvContent.education.content}
              isDarkMode={isDarkMode}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default About;
