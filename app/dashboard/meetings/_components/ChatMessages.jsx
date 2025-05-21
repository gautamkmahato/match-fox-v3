


export default function ChatMessages(chatMessages, chatEndRef){
    return(
        <>
        {/* Right Panel - Chat */}
        <div className="flex flex-col w-full md:w-1/2 border border-gray-100 shadow p-4 rounded-lg h-[412px] overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            <div className="mt-6 space-y-3">
              {chatMessages.map((chat, index) => {
                const isUser = chat.role === 'user';
                return (
                  <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[75%] rounded-2xl p-3 ${isUser ? 'bg-green-200 text-gray-700 rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'} shadow-md`} >
                      {/* Username */}
                      <p className="text-xs font-semibold mb-1 text-gray-700">
                        {isUser ? 'You' : 'Interviewer'}
                      </p>

                      {/* Message Text */}
                      <p className="text-sm whitespace-pre-wrap">{chat.transcript}</p>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>
          </div>
        </div>
        </>
    )
}