import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{backgroundColor: '#C4DFE6'}}>
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{color: '#003B46'}}>
            СистемаКонтроля
          </h1>
          <p style={{color: '#07575B'}}>
            Управление дефектами на строительных объектах
          </p>
        </div>

        <div className="space-y-4">
          <div className="border rounded-lg p-4" style={{backgroundColor: '#66A5AD', borderColor: '#07575B'}}>
            <h2 className="text-lg font-semibold mb-2" style={{color: '#003B46'}}>
              Добро пожаловать!
            </h2>
            <p className="text-sm" style={{color: '#003B46'}}>
              Войдите в систему для начала работы с дефектами строительных объектов.
            </p>
          </div>

          <div className="space-y-2">
            <Link 
              href="/auth/login"
              className="w-full text-white py-2 px-4 rounded-md transition-colors block text-center font-medium hover:opacity-80"
              style={{backgroundColor: '#07575B'}}
            >
              Войти в систему
            </Link>
            
            <Link 
              href="/auth/register"
              className="w-full py-2 px-4 rounded-md transition-colors block text-center font-medium hover:opacity-80"
              style={{backgroundColor: '#66A5AD', color: '#003B46'}}
            >
              Регистрация
            </Link>
          </div>

          <div className="mt-6 pt-6" style={{borderTop: `1px solid #66A5AD`}}>
            <h3 className="text-sm font-semibold mb-2" style={{color: '#003B46'}}>
              Возможности системы:
            </h3>
            <ul className="text-sm space-y-1" style={{color: '#07575B'}}>
              <li>• Регистрация и контроль дефектов</li>
              <li>• Управление проектами</li>
              <li>• Отчетность и аналитика</li>
              <li>• Разграничение прав доступа</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
