import { useAdmin } from "../context/AdminContext";
import { useTheme } from "../context/ThemeContext";

const ResumeSection = ({ title, content, isDarkMode }) => {
  // Parse markdown-style formatting (bold, italic, tabs, bullets)
  const renderFormattedText = (text) => {
    const boldRegex = /\*\*([^*]+)\*\*/g;
    const italicRegex = /\*([^*]+)\*/g;
    
    // First handle bold
    const boldMatches = [];
    let boldMatch;
    // eslint-disable-next-line no-cond-assign
    while ((boldMatch = boldRegex.exec(text)) !== null) {
      boldMatches.push({ index: boldMatch.index, length: boldMatch[0].length, text: boldMatch[1], type: 'bold' });
    }
    
    // Then handle italic (but avoid overlapping with bold)
    italicRegex.lastIndex = 0;
    const italicMatches = [];
    let italicMatch;
    // eslint-disable-next-line no-cond-assign
    while ((italicMatch = italicRegex.exec(text)) !== null) {
      const currentItalicMatch = italicMatch;
      const isBold = boldMatches.some(b => currentItalicMatch.index >= b.index && currentItalicMatch.index < b.index + b.length);
      if (!isBold) {
        italicMatches.push({ index: currentItalicMatch.index, length: currentItalicMatch[0].length, text: currentItalicMatch[1], type: 'italic' });
      }
    }
    
    const allMatches = [...boldMatches, ...italicMatches].sort((a, b) => a.index - b.index);
    
    const result = [];
    let currentIndex = 0;
    
    allMatches.forEach((matchItem, idx) => {
      if (matchItem.index > currentIndex) {
        result.push(text.substring(currentIndex, matchItem.index));
      }
      
      if (matchItem.type === 'bold') {
        result.push(<b key={`bold-${idx}`} className={isDarkMode ? 'text-white-200' : 'text-gray-700'}>{matchItem.text}</b>);
      } else if (matchItem.type === 'italic') {
        result.push(<em key={`italic-${idx}`} className={isDarkMode ? 'text-white-200' : 'text-gray-700'}>{matchItem.text}</em>);
      }
      
      currentIndex = matchItem.index + matchItem.length;
    });
    
    if (currentIndex < text.length) {
      result.push(text.substring(currentIndex));
    }
    
    return result.length === 0 ? text : result;
  };

  return (
    <div className="w-full mb-12">
      <div className="flex flex-row items-start justify-start py-0 pr-0 pl-px">
        <h2 className={`m-0 relative tracking-wide leading-tight uppercase font-semibold font-inherit text-3xl leading-9 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>
          {title}
        </h2>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-4 mt-8">
        {content && (
          <div className={`w-full whitespace-pre-wrap text-base leading-relaxed ${isDarkMode ? 'text-white-200' : 'text-gray-700'}`}>
            {content.split('\n').map((line, idx) => {
              const isBullet = line.trim().startsWith('•');
              const tabCount = (line.match(/^\t+/) || [''])[0].length;
              const cleanLine = line.replace(/^\t+/, '');
              
              const style = {
                marginLeft: isBullet ? `${tabCount * 2 + 1.5}rem` : `${tabCount * 2}rem`,
                listStyleType: isBullet ? 'disc' : 'none',
                display: isBullet ? 'list-item' : 'block',
              };
              
              return (
                <div key={idx} style={style} className="mb-2">
                  {renderFormattedText(cleanLine)}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const Experience = () => {
  const { cvContent } = useAdmin();
  const { isDarkMode } = useTheme();

  return (
    <div className={`w-full flex flex-col items-center py-8 ${
      isDarkMode ? 'bg-black' : 'bg-white'
    }`}>
      <section className="w-full max-w-4xl flex flex-col gap-8 px-6">
        <div className={`self-stretch flex flex-col items-start justify-start gap-12 max-w-full shrink-0 text-left text-9xl font-inter p-8 rounded-lg ${
          isDarkMode ? 'bg-darkslategray' : 'bg-gray-50'
        }`}>
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
        </div>
      </section>
    </div>
  );
};

export default Experience;
