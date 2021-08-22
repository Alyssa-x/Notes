import numpy as np

lines = '7\n1,2,0\n2,4,0\n1,3,0\n3,4,0\n2,3,0\n5,6,0\n7,5,0\n'

def init(read=True):
    if read:
        f = open('dp.txt', 'r')
        lines = f.readlines()
        
    N = int(lines[0][:-1])  # 去除回车\n,txt文件中最后一行得换行
    cityInfo = [N]

    for i in range(1, len(lines)):  # 把string 转换成list储存
        line = lines[i][:-1]
        [x, y, h] = line.split(',')
        cityInfo.append([float(x), float(y), float(h)])

    return cityInfo

def getDistance(currentCity, nextCity):
    return np.sqrt((currentCity[0] - nextCity[0])**2 + (currentCity[1] - nextCity[1])**2)

def findMinPath(cityInfo):
    N = cityInfo[0]
    cityInfo = cityInfo[1:] #   去掉N
    Greatness = np.sum(np.array(cityInfo)[:, -1])  # 获取所有城市的幸福感，反正都要到每一个城市
    path = 0    # 路径总数
    loggedCityNum = [0] # 去过的城市

    for _ in range(1, N):   # 对于当前城市
        distanceToCurrentCity = []  # 每个城市到现在的城市的距离
        currentCity = cityInfo[loggedCityNum[-1]]

        for j in range(1, N):   # 对于下一个城市
            if j in loggedCityNum:  # 如果是已经到过的城市跳过
                continue
            else:
                nextCity = cityInfo[j]  # 下一个城市
                distance = getDistance(currentCity, nextCity)   # 获取距离
                distanceToCurrentCity.append([j, distance]) # 加入距离list
        
        distanceToCurrentCity = np.array(distanceToCurrentCity) # 转换成array方便求min的index
        minDistanceIndex = np.argmin(distanceToCurrentCity, axis=0) # 求min的index
        
        path += distanceToCurrentCity[minDistanceIndex[1], 1]   # 获取该index的路径长度
        loggedCityNum.append(int(distanceToCurrentCity[minDistanceIndex[1], 0]))    # 获取下一个城市的序号

        # 这些可以显示路径
        # print(cityInfo[loggedCityNum[-1]][0:2])
        # print(distanceToCurrentCity[minDistanceIndex[1], 1])
        # print(loggedCityNum)

    return Greatness - path

if __name__ == '__main__':
    citys = init()
    print(findMinPath(citys))