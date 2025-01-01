import React from 'react';

function PlatformContent({ selectedPlatform, contentData }) {
  if (!selectedPlatform) {
    return (
      <div className="p-6 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-lg">
        <p className="text-center text-lg font-semibold text-gray-700">Please select a platform.</p>
      </div>
    );
  }

  const platformContent = contentData.filter(item => item.platform === selectedPlatform);

  return (
    <div className="p-6 max-w-3xl mx-auto ">
      {platformContent.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {platformContent.map((content, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                {content.platform} Content {index + 1}
              </h2>

              <div className="space-y-4">
               
                {[
                  { label: 'Hook', value: content.hook },
                  { label: 'Script', value: content.script },
                  { label: 'CTA', value: content.cta },
                  { label: 'Target Audience', value: content.targetAudience },
                  { label: 'Focus', value: content.focus },
                  { label: 'Posting Date', value: content.posting },
                  { label: 'Content Pillar', value: content.contentPillar },
                  { label: 'Content Type', value: content.contentType },
                ].map(({ label, value }, idx) => (
                  <div key={idx} className="flex justify-between items-center text-gray-700">
                    <span className="font-medium text-gray-600">{label}:</span>
                    <p className="text-gray-800">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-500">No content available for this platform.</p>
      )}
    </div>
  );
}

export default PlatformContent;
