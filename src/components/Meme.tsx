export function Meme({ className = "" }) {
  return (
    <svg width="72" height="72" viewBox="0 0 1200 1200" className={className}>
      <path d="m617.78 1142.1c-21.727-10.414-55.117-22.465-74.203-26.785-37.137-8.4062-132.83-54.656-180.75-87.359-91.262-62.277-162.12-193.39-212.62-393.45-13.098-51.879-15.73-72.914-15.648-125.08 0.17187-110.45 21.715-223.59 54.168-284.48 26.477-49.672 111.21-122.21 182.07-155.85 48.312-22.938 87.043-28.621 193.85-28.441 100.96 0.16797 149.54 7.4492 209.48 31.414 23.199 9.2734 67.785 21.473 99.082 27.109 68.078 12.258 96.973 24.004 121 49.188 21.379 22.406 20.199 38.602-2.1875 30.09-22.094-8.4023-26.445-6.1562-13.918 7.1758 13.742 14.629 22.043 40.566 22.043 68.879 0 11.164 2.7773 25.488 6.168 31.824 3.3906 6.3398 8.0039 31.676 10.25 56.305 2.9961 32.891 6.9922 48.422 15.039 58.496 25.664 32.117 29.102 43.691 29.312 98.688 0.16016 42.18-2.4531 61.305-12.707 92.941-15.051 46.426-17.301 108.1-6.1016 167.11 8.0469 42.391 5.3594 158.22-4.4062 189.87-3.3477 10.855-16.156 34.746-28.461 53.094-20.715 30.887-26.309 35.332-75.48 59.949-29.211 14.625-63.625 34.348-76.477 43.832-12.852 9.4805-28.453 17.242-34.672 17.242-6.2148 0-28.758 8.3633-50.09 18.59-33.238 15.93-44.254 18.59-77.008 18.59-32.883 0-43.738-2.6445-77.723-18.93zm120.98-12.137c6.6719-1.9023 15.102-9.4297 18.727-16.73 5.7773-11.637 11.023-13.66 42.477-16.371 19.738-1.7031 38.465-5.6758 41.621-8.832 8.418-8.418 0.63281-17.285-15.18-17.285-7.5781 0-28.574-8.2734-46.656-18.383-29.629-16.57-34.617-21.941-50.543-54.438-30.172-61.562-92.406-112.05-168.59-136.75-33.312-10.805-32.016-21.539 2.0352-16.871 29.953 4.1055 66.332 22.758 110.69 56.754 19.543 14.977 36.27 26.426 37.172 25.438 0.90234-0.98437 4.3867-22.699 7.7422-48.246s13.184-69.457 21.84-97.578c19.754-64.176 21.547-135.9 4.957-198.3-12.094-45.48-10.23-65.336 9.625-102.49 7.4219-13.891 12.078-26.668 10.348-28.402-1.7305-1.7305-15.379-0.52734-30.328 2.6836-33.012 7.0781-127.2 7.5742-138.04 0.72656-14.441-9.1328-0.28516-12.766 46.398-11.914 25.516 0.46875 59.535-1.7695 75.598-4.9688 35.801-7.1289 85.266-31.594 94.359-46.664 6.0508-10.027 5.2461-11.727-7.9648-16.824-55.297-21.34-70.438-40.113-70.453-87.359-0.011719-42.641 24.117-77.926 76.984-112.57 23.359-15.309 43.23-30.105 44.156-32.887 2.7227-8.1719-34.293-12.625-79.316-9.5391-40.457 2.7734-41.832 2.4805-41.832-8.8438 0-6.4414 2.6602-14.371 5.9102-17.625 20.73-20.73-35.191-33.961-157.56-37.281-107.99-2.9297-150.23 1.8789-169.54 19.312-5.9141 5.3398-18.34 11.129-27.621 12.863-29.281 5.4805-62.895 24.332-101.84 57.109-70.496 59.34-88.664 93.715-110.65 209.36-9.1094 47.902-13.328 89.367-13.785 135.43-0.58594 59.238 1.1484 72.98 16.117 127.61 46.152 168.43 102.27 286.15 166.64 349.53 26.445 26.039 121.28 74.988 201.12 103.8 27.75 10.016 65.988 25.598 84.973 34.629 27.453 13.059 41.047 16.312 66.387 15.895 17.527-0.28906 37.324-2.082 44-3.9805zm-177-103.71c-62.145-20.098-66.645-22.41-62.852-32.289 2.2109-5.7578 12.434-2.7656 45.957 13.445 23.715 11.469 49.816 20.852 58.004 20.852 9.6914 0 14.887 2.7773 14.887 7.9688 0 4.3789-0.59766 7.8086-1.3281 7.6211-0.73047-0.19141-25.328-8.1055-54.664-17.594zm-201.59-114.83c-5.7188-9.2539 2.7578-17.148 11.035-10.277 4.0898 3.3945 6.125 8.2891 4.5234 10.879-3.875 6.2695-11.496 5.9727-15.562-0.61328zm-62.336-125.96c-8.8398-24.887-12.625-42.848-9.6562-45.816 4.7812-4.7812 9.6445 4.4219 32.527 61.574 9.4492 23.605 9.5078 25.227 0.88281 25.199-6.6875 0-13.207-11.266-23.754-40.961zm317.26-20.227c-11.684-7.1953-23.633-13.965-26.555-15.039-2.9219-1.0664-3.6875-3.7109-1.6992-5.8516 3.293-3.5547 52.156 26.336 52.156 31.906 0 3.5703-0.85938 3.1758-23.898-11.012zm-49.125-255.65c-9.2461-3.7305-8.3203-12.414 1.3281-12.414 4.3828 0 7.9648 3.5859 7.9648 7.9648 0 4.3828-0.59766 7.7773-1.3281 7.5469-0.73047-0.23047-4.3164-1.625-7.9648-3.0977zm-134.36-94.461c-25.254-9.3047-79.434-40.137-91.188-51.891-5.2031-5.2031-14.238-9.457-20.078-9.457-14.785 0-13.277-7.5391 5.3125-26.555 10.535-10.777 15.934-21.691 15.934-32.219 0-45.859 48.211-103.73 97.469-116.99 12.266-3.3008 36.762-4.082 59.949-1.9102 31.992 2.9961 42.863 6.5312 59.062 19.191 55.402 43.301 65.121 142.07 18.562 188.63-32.188 32.188-47.688 38.895-88.992 38.5-20.445-0.19531-45.66-3.4805-56.027-7.3008zm103.71-31.008c11.625-6.582 26.688-21.48 33.469-33.105 10.48-17.961 11.922-26.141 9.5898-54.457-5.5625-67.559-33.68-93.254-102.05-93.254-44.227 0-66.309 11.078-90.184 45.25-40.129 57.434-20.641 121.15 41.977 137.24 12.281 3.1562 24.719 6.6133 27.641 7.6875 17.855 6.5547 60.266 1.5703 79.555-9.3555zm-135.13-29.992c-7.9961-14.938-6.7344-38.707 2.7695-52.277 6.3242-9.0273 13.539-11.805 30.684-11.805 46.348 0 60.043 29.078 27.25 57.871-22.516 19.77-51.84 22.77-60.703 6.2109zm-170.14-105.41c0-7.6367 57.812-59.57 66.312-59.57 3.8711 0 16.93-8.2656 29.02-18.367 27.969-23.367 135.44-58.707 162.88-53.562 16.402 3.0781 27.305 11.242 22.043 16.508-1.2578 1.2578-20.516 6.9492-42.789 12.648-56.004 14.324-92.691 33.523-133.81 70.027-30.91 27.441-37.785 31.18-57.43 31.242-12.273 0.035156-27.695 1.5117-34.266 3.2734-6.6523 1.7812-11.949 0.80859-11.949-2.1953zm701.88 789.85c30.867-16.199 52.754-39.199 69.34-72.863 17.043-34.598 17.488-37.266 19.242-116.22 1.4375-64.652-0.015625-86.977-7.2891-111.66-12.961-44.012-11.477-77.008 6.0469-134.51 12.387-40.645 15.355-60.277 15.363-101.7 0.011719-48.594-0.84766-52.551-16.129-74.352-29.934-42.707-87.82-67.535-133.74-57.363-48.996 10.852-113.89 118.08-113.89 188.19 0 13.004 1.4922 26.055 3.3125 29.004 1.8203 2.9492 5.543 24.926 8.2695 48.84 6.0977 53.461 0.046875 100.75-21.484 167.97-12.98 40.523-15.77 58.262-15.77 100.33 0 28.105 2.8945 60.77 6.4336 72.582 8.5078 28.402 35.5 54.555 66.613 64.547 28.832 9.2617 93.742 7.6641 113.68-2.7969zm-95.484-51.098c-28.598-14.09-43.801-38.879-48.98-79.844-4.7188-37.312 0.97656-114.3 11.305-152.87 3.1289-11.684 7.3672-71.629 9.4219-133.21l3.7305-111.97 17.27-35.078c27.656-56.176 59.574-75.113 105.67-62.703 31.992 8.6133 46.551 23.031 60.574 59.984 19.375 51.059 17.836 105.26-4.5977 161.99-21.012 53.133-23.039 100.82-6.707 157.93 9.0547 31.66 9.7656 41.84 5.0195 71.68-7.5 47.125-37.762 109.28-59.719 122.67-21.203 12.93-68.176 13.652-92.98 1.4297zm77.648-23.996c3.5039-3.5078 6.375-8.0625 6.375-10.125 0-6.3438-48.52-20.68-69.988-20.68-16.559 0-20.297 1.9023-20.297 10.32 0 5.6758 5.3125 14.043 11.805 18.586 14.07 9.8555 62.867 11.137 72.109 1.8945zm-4.25-60.012c0-19.414-7.0781-24.859-12.828-9.875-4.0195 10.477 0.95703 28.461 7.875 28.461 2.7227 0 4.9531-8.3633 4.9531-18.586zm-74.352-5.793c0-14.508-13.406-22.758-22.391-13.777-4.1172 4.1172-3.1992 9.6289 3.2461 19.461 10.395 15.863 19.145 13.262 19.145-5.6875zm115.99 5.5391c8.9453-19.633 7.7383-23.648-7.1133-23.648-11.039 0-13.277 2.5391-13.277 15.047 0 25.227 10.75 29.762 20.391 8.6016zm-76.156-7.7148c0-14.555-11.824-20.586-16.5-8.4102-4.3945 11.457 1.7188 25.727 9.8633 23.012 3.6484-1.2148 6.6367-7.7891 6.6367-14.602zm61.074-42.84c0-12.145-28.512-42.133-49.902-52.488-25.359-12.273-57.512-14.281-65.945-4.1172-3.0898 3.7227-7.2773 19.258-9.3008 34.52l-3.6797 27.75h64.414c42.09 0 64.414-1.9648 64.414-5.6641zm26.43-24.875c-0.070313-8.0312-4.9531-32.527-10.855-54.438-13.402-49.742-10.258-87.559 11.922-143.39 8.7031-21.906 16.234-49.391 16.734-61.074l0.91406-21.242h-143.39l-4.082 95.598c-2.2461 52.578-4.6328 102.7-5.3125 111.38-1.1875 15.223-0.22656 15.934 26.898 19.906 37.168 5.4414 54.406 14.984 78.957 43.691 11.207 13.102 22.168 23.902 24.355 24 2.1914 0.13281 3.9258-6.3984 3.8594-14.43zm-98.43-308.87c1.6367-2.6523 1.0273-10.094-1.3555-16.539-4.0664-10.992-4.8906-11.164-13.289-2.7656-4.9219 4.9219-8.9531 12.367-8.9531 16.539 0 8.3086 18.809 10.512 23.598 2.7656zm44.453-12.031c-2.0859-21.121-10.902-24.52-19.918-7.6758-8.1133 15.16-3.9375 24.527 10.938 24.527 8.7656 0 10.352-2.9766 8.9805-16.852zm32.855 6.543c0-5.668-2.1406-11.629-4.7539-13.246-5.707-3.5273-12.469 11.859-8.2266 18.723 5.2344 8.4648 12.98 5.1992 12.98-5.4766zm37.973 2.3438c0-2.7734-2.5703-5.9023-5.7109-6.9492-3.1406-1.0469-5.7109 2.0781-5.7109 6.9492 0 4.8672 2.5703 7.9961 5.7109 6.9492s5.7109-4.1719 5.7109-6.9492zm-16.73-50.531c0-13.383-28.914-31.742-50.035-31.77-16.223 0-34.938 12.891-34.938 24.102 0 3.8164 12.727 8.7188 30.539 11.773 48.898 8.3789 54.438 7.9609 54.438-4.1055zm26.555-125.17c0-12.25-2.2305-18.289-6.2578-16.945-17.406 5.8008-18.977 35.977-1.875 35.977 5.7891 0 8.1328-5.4805 8.1328-19.031zm-57.281-5.457c22.086-11.422 42.484-57.156 40.32-90.41-1.9609-30.16-9.4453-34.273-20.215-11.109-6.1875 13.312-11.762 17.504-24.98 18.781-37.879 3.6641-50.27-20.906-24.238-48.078 12.168-12.699 13.238-15.949 6.6367-20.125-12.039-7.6133-45.785-6.082-67.793 3.0781-22.309 9.2852-61.938 45.625-73.281 67.199-16.598 31.57-6.5234 74.734 20.301 86.973 22.316 10.184 119.65 5.8984 143.25-6.3047z" />
    </svg>
  );
}