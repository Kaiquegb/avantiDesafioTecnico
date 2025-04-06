interface ErrorMessageProps {
    message: string;
  }
  
  export function ErrorMessage({ message }: ErrorMessageProps) {
    const isRateLimit = message.includes('Limite');
    
    return (
      <div className="error-message">
        <p>{message}</p>
        {isRateLimit && (
          <a 
            href="https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting" 
            target="_blank"
            className="rate-limit-link"
            rel="noreferrer"
          >
            Como resolver?
          </a>
        )}
      </div>
    );
  }